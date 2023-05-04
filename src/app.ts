import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; // 쿠키
import session, { SessionData } from "express-session";
// const csrf = require("csurf");
import csrf from "csurf";
// console.log(csrf);
const MongoDBSessionStore = require("connect-mongodb-session")(session);
import morgan, { Options } from "morgan";
import { config } from "./config";
config();

// 라우터
import prductRouter from "./routes/products";
import shopRouter from "./routes/shop";
import userRouter from "./routes/users";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import authRouter from "./routes/auth";

import path from "path";
// import User from "./models/user";
// import User from "./models/user";
import User from "./models/mongoose/user";
import { Mongoose } from "mongoose";
import { ObjectId } from "mongodb";
import { getToken } from "./utils/csrf";
import { CsrfTokenCreator } from "csrf-csrf";
import connectFlash from "connect-flash";

const morganOption: Options<Request, Response> = {
	skip: function (req: Request, res: Response) {
		const re = req.url.endsWith(".css") || req.url.endsWith(".ico");
		return re;
	},
};
const SESSION_SECRET = process.env.SESSIONS_SECRET || "";
// console.log(SESSION_SECRET);
const password = process.env.MONGDB_PASSWORD || "";
const host = process.env.MONGODB_URL!.replace("<password>", escape(password));
const db = process.env.MONGODB_DB;
const dummy = process.env.MONGODB_URL_DUMMY;
const url = `${host}${db}${dummy}`;
// console.log(url);

declare global {
	namespace Express {
		interface Request {
			user: any;
			csrfToken: () => string;
		}
	}
}
declare module "express-session" {
	interface SessionData {
		isLogin: boolean;
		user: string;
	}
}
// declare module "express-serve-static-core" {
// 	interface Request {
// 		csrfToken?: (overwrite?: boolean) => ReturnType<CsrfTokenCreator>;
// 	}
// }
// console.log(global);

const app = express();
app.use(morgan("dev", morganOption));
app.use(cookieParser());
// 섹션 미들웨어

const store = new MongoDBSessionStore({
	uri: url,
	session: "sessions",
});
const csrfProtection = csrf({
	// cookie: {
	// 	// here you can configure your cookie. Default values are ok, but I decided to be more explicit
	// 	// http://expressjs.com/en/4x/api.html#req.cookies
	// 	key: "_csrf",
	// 	path: "/",
	// 	httpOnly: false, // if you want you can use true here
	// 	secure: false, // if you are using HTTPS I suggest true here
	// 	signed: false, // I don't know if csurf supports signed cookies, so I used false
	// 	// not mandatory, but if you want you can use sameSite: 'strict'
	// 	// sameSite: 'strict', // https://www.owaspsafar.org/index.php/SameSite
	// 	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	// },
	cookie: true,
});

// console.log(store);
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		// cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
		store: store,
	})
);

// csrf
// app.use(csrfProtection);
app.use(connectFlash());

app.use(async (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.cookies);
	// const user = await User.findByPk(1);
	// const info = await User.getById("644fe3dac80fdd53f10cfb26");
	// console.log(req.session);
	const user = await User.findById(
		{ _id: new ObjectId(req.session.user) },
		{ name: 1, email: 1 }
	);
	req.user = user;
	// console.log(info);
	// req.user = new User(
	// 	info.name || "",
	// 	info.email || "",
	// 	info.id?.toString() || "",
	// 	info.cart || null
	// );
	// console.log(req.user);
	next();
});

// db.query("select 1;").then(rows => console.log(rows));
app.use((req: Request, res: Response, next: NextFunction) => {
	// console.log("res.locals");
	// res.locals.csrfToken = getToken(req, res);
	res.locals.isAuthenticated = req.session.isLogin;
	// console.log(res.locals);
	// console.log(app.locals.csrfToken);
	// console.log(req.csrfToken());

	next();
});

// body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static
const staticDir = path.resolve(__dirname, "../public");
app.use(express.static(staticDir));

//
app.set("view engine", "pug"); // pug
const viewDir = path.join(__dirname, "./views");
app.set("views", viewDir);
//

// 라우팅
app.use("/", shopRouter);
app.use("/products", prductRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use("*", (req, res, next) => {
	// res.sendFile(path.join(__dirname, "./views", "404.html"));
	res.render("404");
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
// 	console.log(err);
// 	if (err.code !== "EBADCSRFTOKEN") {
// 		return next(err);
// 	}
// 	res.status(403).json({
// 		message: "error",
// 	});
// });

export default app;
