import { ObjectId } from "bson";
import { NextFunction, Request, Response } from "express";
import { title } from "process";
// import Product, { getProducts as getItems } from "../models/products_mysql";
// import Product from "../models/products";
// import Product, { IProduct } from "../models/product";
import Product from "../models/mongoose/product";

export const getAllProducts = async () => {
	const items = await Product.find({});
	return items;
};
export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// res.sendFile(shopDir);
	// const items = await getItems();
	// const items = await Product.getAllProducts();
	// const items = await Product.findAll();
	// const items = await Product.getAllProudcts();
	const items = await Product.find();
	res.render("products", {
		products: items,
		docTitle: "Product's",
		path: "products",
		// isAuthenticated: req.session.isLogin,
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
	//console.log(req?.user?.id);

	// const result = await req.user.createProduct({
	// 	title,
	// 	price,
	// 	description,
	// 	imageUrl: image,
	// });

	// const result = await Product.create({
	// 	title,
	// 	price,
	// 	description,
	// 	imageUrl: image,
	// 	userId: req?.user?.id,
	// });
	// const p = new Product(title, price, image, description, "");
	// await p.save();
	const result = await Product.create({
		title,
		price,
		imageUrl: image,
		description,
		userId: req.user.id,
	});
	console.log(result);
	res.status(201).redirect("/products");
};

export const getAddProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.url, req.params);
	const name = req.params.name;
	// const products = await getItems();
	// const item = products.find(p => p.title === name);

	res.render("product/add", {
		path: "products",
		isAuthenticated: req.session.isLogin,
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
	// const item = await Product.getProduct(id);
	// const product = await Product.findByPk(id);
	// const item = await Product.getProduct(id);
	const product = await Product.findById(id);
	res.render("product/edit", {
		product: product,
		path: "products",
		// isAuthenticated: req.session.isLogin,
	});
};

export const getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.url, req.params);
	const id = req.params.id;
	// const products = await getItems();
	// const item = products.find(p => p.id === id);
	// const product = await Product.findByPk(id);
	// const product = await Product.getProduct(id)!;
	const product = await Product.findById(id);
	console.log(product);
	res.render("product/detail", {
		docPage: `${""}  Detail Page`,
		product: product,
		path: "products",
		// isAuthenticated: req.session.isLogin,
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
	// const item = new Product(title, +price, image, description);
	// await item.update(id);
	// const p = await Product.findByPk(id);
	// const items = await Product.findAll({ where: { id: id } });
	// const p = items[0];
	// if (p) {
	// 	p.title = title;
	// 	p.price = price;
	// 	p.imageUrl = image;
	// 	p.description = description;
	// 	await p.save();
	// }
	// const item = new Product(title, price, image, description, id);
	// const update = await item.update(id);

	await Product.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				price,
				imageUrl: image,
				description,
			},
		}
	);

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
	// await Product.remove(id);
	// const p = await Product.findByPk(id);
	// p?.destroy();
	// const result = await Product.deleteOne(id);
	// console.log(result);
	const result = await Product.deleteOne({
		_id: id,
	});
	console.log(result);

	res.status(204).redirect("/products");
};
