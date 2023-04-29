import { NextFunction, Router, Request, Response } from "express";
import path from "path";
// import { getProducts } from "../models/products";
import Product from "../models/products";

const router = Router();

const shopDir = path.join(__dirname, "../views", "shop.html");

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	// const products = await getProducts();
	const result = await Product.getAllProducts();
	//console.log(result);
	res.render("index", {
		docTitle: "SHOP",
		products: [],
		path: "index",
	});
});

export default router;
