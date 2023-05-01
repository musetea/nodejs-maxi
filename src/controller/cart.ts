import { Request, Response, NextFunction } from "express";

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cart = await req.user.getCart();
	console.log("cart", cart);
	const products = await cart?.getProducts();
	console.log("products", products);

	res.status(200).render("cart", {
		docPage: "cart",
		path: "cart",
		products: products,
	});
};
