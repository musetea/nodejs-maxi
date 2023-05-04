import { Request, Response, NextFunction } from "express";
import User from "../models/mongoose/user";
import { hash, genSalt, compare } from "bcrypt";
import { sendMail2 } from "../utils/email";
import { randomBytes } from "crypto";
import { EDESTADDRREQ } from "constants";

/**
 * 로그인 폼 반환.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const msges = req.flash("error");
	const payload = {
		docPage: "Login",
		path: "login",
		// isAuthenticated: req.session.isLogin,
		// csrfToken: req.csrfToken(),
		error: msges[0] ? msges[0] : null,
	};
	return res.status(200).render("auth/login", payload);
};

export const postLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const payload = req.body;
	console.log(payload);
	const { email, password } = payload;

	if (!email || !password) {
		console.log("데이터 유효성 검사 오류");
		req.flash("error", `${email}, ${password} 입력 데이터 오류`);
		return res.status(400).redirect("/auth/login");
	}
	// 쿠키설정
	// res.cookie('cookieKey', 'cookieValue', { maxAge: 900000, httpOnly: true });
	// res.setHeader("Set-Cookie", "loggedIn=true");
	// res.cookie("loggedIn", "true");

	// 사용자 체크
	const user = await User.findOne({ email: email });
	if (!user) {
		console.log("존재하지 않은 사용자 체크 ");
		req.flash("error", `존재하지 않은 사용자입니다.`);
		return res.status(400).redirect("/auth/login");
	}

	// 비밀번호 체크
	const isCheck = await checkPassword(password, user.password);
	if (!isCheck) {
		req.flash("error", `비밀번호를 확인해 주세요!!.`);
		return res.status(400).redirect("/auth/login");
	}

	req.session.isLogin = true;
	req.session.user = user._id.toString();
	// console.log(req.session);

	// const result = await sendMail(
	// 	"t7730@daum.net",
	// 	"정상적으로 로그인이 되었습니다."
	// );
	// console.log(result);

	res.redirect("/");
};

export const postLogout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/");
	});
};

export const getSingup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const msges = req.flash("error");
	const payload = {
		docPage: "Singup",
		path: "signup",
		// isAuthenticated: req.session.isLogin,
		error: msges[0] ? msges[0] : null,
	};
	return res.status(200).render("auth/signup", payload);
};

export const postSignup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const payload = req.body;
	const { name, email, password, passwordConfirm } = payload;

	//  기본 데이터 체크
	if (!name || !email || !password || !passwordConfirm) {
		req.flash("error", "invalid input data");
		return res.status(400).redirect("/auth/signup");
	}
	if (password !== passwordConfirm) {
		req.flash("error", "invalid input data");
		return res.status(400).redirect("/auth/signup");
	}

	// 이메일체크
	const filter = { email: email };
	const isUser = await User.findOne(filter);
	if (isUser) {
		req.flash("error", `${email} 을 갖는 사용자는 존재합니다..`);
		return res.status(400).redirect("/auth/signup");
	}

	// 비밀번호 암호화
	const hashPass = await hashing(password);
	// console.log(password, hashPass);

	const user = new User({
		name: name,
		email: email,
		password: hashPass,
		cart: {
			items: [],
		},
	});
	const result = await user.save();
	// console.log(result);
	res.redirect("/");
};

export const getResetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const msges = req.flash("error");
	const payload = {
		docPage: "Reset Password",
		path: "reset",
		// isAuthenticated: req.session.isLogin,
		error: msges[0] ? msges[0] : null,
	};
	res.status(200).render("auth/reset", payload);
};
export const postResetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	const token = await randomBytes(32).toString("hex");
	console.log("token", token);
	// 사용자를 찾는다 (이메일)
	const user = await User.findOne({ email: email });
	if (!user) {
		console.log("사용자를 찾을수 없습니다.");
		req.flash("error", `${email} 사용자를 찾을수 없습니다.`);
		return res.status(401).redirect("/auth/reset");
	}
	user.resetToken = token;
	user.resetTokenExpiration = new Date(Date.now() + 10 * 60 * 60 * 1000);
	await user.save();
	// 이메일발송

	const resetUrl = `${req.protocol}://${req.get("host")}/auth/reset/${token}`;

	const msg = `
		<h1> 비밀번호 초기화 </h1>
		<p> 
			클릭하세요 
			<a href=${resetUrl}> 클릭여기 </a> <br>
			비밀번호가 초기화 됩니다.
		</p>
	`;

	const result = await sendMail2(email, "비밀번호초기화", msg);
	console.log(result);
	res.redirect("/");
};

/**
 * 1) token 으로 사용자를 찾는다.
 * @param req
 * @param res
 * @param next
 */
export const getNewPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.params;
	if (!token) {
		return res.status(400).redirect("/");
	}

	const now = new Date(Date.now()).toISOString();
	console.log(now, Date.now());
	const user = await User.findOne({
		resetToken: token,
		resetTokenExpiration: {
			$gt: now,
		},
	});
	if (!user) {
		console.log("유효하지 않은 토큰입니다.");
		return res.status(401).redirect("/");
	}

	// 새로운 비밀번호 화면을 제공한다.
	const msges = req.flash("error");
	const payload = {
		docPage: "New Password",
		path: "new-password",
		error: msges[0] ? msges[0] : null,
		userId: user._id.toString(),
	};
	res.render("auth/new-password", payload);
};
/**
 * 해당사용자 비밀번호 설정
 * @param req
 * @param res
 * @param next
 */
export const postNewPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { userId, password } = req.body;

	if (!userId || !password) {
		req.flash("error", "사용자 정보 제공 오류");
		return res.redirect("/auth/new-password");
	}

	const user = await User.findById(userId);
	if (!user) {
		req.flash("error", `${userId} 사용자 정보 제공 오류`);
		return res.redirect("/auth/new-password");
	}

	const hassPass = await hashing(password);
	user.password = hassPass;
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;
	await user.save();

	res.redirect("/auth/login");
};

/** 10 적당 */
const hashing = async (pass: string) => {
	const saltRound = 10;
	const salt = await genSalt(saltRound);
	const hashedPassword = await hash(pass, salt); // password 해쉬화 완성
	return hashedPassword;
};
const checkPassword = async (pass: string, hashPass: string) => {
	const check = await compare(pass, hashPass);
	console.log(pass, hashPass, check);
	return check;
};

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session.isLogin) {
		return res.redirect("/auth/login");
	}
	next();
};
