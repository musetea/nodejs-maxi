import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan, { Options } from "morgan";
import { config } from "./config";
config();

// import db from "./db/mysql";

// 라우터
import prductRouter from "./routes/products";
import shopRouter from "./routes/shop";
import userRouter from "./routes/users";
import cartRouter from "./routes/cart";

import path from "path";
const morganOption: Options<Request, Response> = {
	skip: function (req: Request, res: Response) {
		return req.url.endsWith(".css");
	},
};
const app = express();
app.use(morgan("dev", morganOption));

// db.query("select 1;").then(rows => console.log(rows));

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
app.use("/users", userRouter);

app.use("*", (req, res, next) => {
	// res.sendFile(path.join(__dirname, "./views", "404.html"));
	res.render("404");
});

export default app;
