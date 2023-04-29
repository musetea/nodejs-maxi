import { Router, Request, Response, NextFunction } from "express";
import Cart, { getCart } from "../models/cart";

const router = Router();

router.get("/", async (req, res, next) => {
	res.render("cart", {
		path: "cart",
		cart: await getCart(),
	});
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const { id, price, quentity } = req.body;
	if (!id || !price || !quentity) {
		res.status(400).redirect("/");
	}
	//const cart = await getCart();

	await Cart.addProduct(id, parseInt(price), parseInt(quentity));

	res.status(200).redirect("/");
});

export default router;
