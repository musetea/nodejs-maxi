import { NextFunction, Router, Request, Response } from "express";
import path from "path";
import { getProducts } from "../models/products";

const router = Router();

const shopDir = path.join(__dirname, "../views", "shop.html");

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const products = await getProducts();
	res.render("index", {
		docTitle: "SHOP",
		products: products,
		path: "index",
	});
});

export default router;
