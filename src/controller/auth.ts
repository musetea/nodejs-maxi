import { Request, Response, NextFunction } from "express";

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
	const payload = {
		docPage: "Login",
		path: "login",
		isAuthenticated: req.session.isLogin,
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

	// if (!email || !password) {
	// 	return res.status(400).redirect("/auth/login");
	// }
	// 쿠키설정
	// res.cookie('cookieKey', 'cookieValue', { maxAge: 900000, httpOnly: true });
	// res.setHeader("Set-Cookie", "loggedIn=true");
	// res.cookie("loggedIn", "true");
	req.session.isLogin = true;
	console.log(req.session);
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
