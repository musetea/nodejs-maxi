import { Request, Response, NextFunction } from "express";
import { getDb } from "../db/mongo";
import { clsCart } from "../models/cart";

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// const cart = await req.user.getCart();
	// console.log("cart", cart);
	// const products = await cart?.getProducts();
	// console.log("products", products);
	const items = await req.user.getCart();
	console.log(items);
	res.status(200).render("cart", {
		docPage: "cart",
		path: "cart",
		products: items,
	});
};

export const addCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, price, quentity } = req.body;
	console.log(id, price, quentity);

	if (!id || !price || !quentity) {
		res.status(400).redirect("/");
	}
	// const cart = await req.user.getCart();
	// const products = await cart?.getProducts({ where: { id: id } });
	// console.log(products);
	//const cart = await getCart();
	// await Cart.addProduct(id, parseInt(price), parseInt(quentity));
	req.user.addToCart(id, quentity);

	res.status(200).redirect("/");
};
