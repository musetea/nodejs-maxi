import { NextFunction, Router, Request, Response } from "express";
import path from "path";
// import { getProducts } from "../models/products";
// import Product from "../models/products_mysql";
import Product from "../models/product";

const router = Router();

const shopDir = path.join(__dirname, "../views", "shop.html");

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	// const products = await getProducts();
	// const result = await Product.getAllProducts();
	// const products = await Product.findAll();
	const items = await Product.getAllProudcts();
	console.log(items);
	res.render("index", {
		docTitle: "SHOP",
		products: items,
		path: "index",
	});
});

export default router;
