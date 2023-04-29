import { NextFunction, Request, Response } from "express";
import Product, { getProducts as getItems } from "../models/products";

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// res.sendFile(shopDir);
	// const items = await getItems();
	const items = await Product.getAllProducts();
	res.render("products", {
		products: items,
		docTitle: "Product's",
		path: "products",
	});
};

export const addProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, price, image, description } = req.body;
	if (!title || !price || !image || !description) {
		return res.status(400).redirect("/products");
	}

	const p = new Product(title, price, image, description);
	await p.save();
	res.status(201).redirect("/products");
};

export const getAddProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.url, req.params);
	const name = req.params.name;
	const products = await getItems();
	const item = products.find(p => p.title === name);

	res.render("product/add", {
		path: "products",
	});
};
// https://api.api-ninjas.com/v1/randomimage?category=nature
// https://placeimg.com/640/480/nature

export const getEditProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.url, req.params);
	const id = req.params.id;
	// const products = await getItems();
	// const item = products.find(p => p.title === name);
	const item = await Product.getProduct(id);

	res.render("product/edit", {
		product: item,
		path: "products",
	});
};

export const getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.url, req.params);
	const id = req.params.id;
	const products = await getItems();
	const item = products.find(p => p.id === id);

	res.render("product/detail", {
		docPage: `${item?.title}  Detail Page`,
		product: item,
		path: "products",
	});
};

export const postProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const { title, price, image, description } = req.body;
	//console.log(id, title, price, image, description);

	// const products = await getItems();
	// const idx = products.findIndex(p => p.id === id);
	// if (idx < 0) {
	// 	return res.status(404).redirect("/products");
	// }
	// products[idx]
	const item = new Product(title, +price, image, description);
	await item.update(id);

	res.status(200).redirect("/products");
};
export const removeProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("removeProduct is called");
	const id = req.params.id;
	console.log("delete", id);
	if (!id) {
		return res.status(400).redirect("/products");
	}
	await Product.remove(id);

	res.status(204).redirect("/products");
};
