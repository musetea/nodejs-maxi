import { Router, Request, Response, NextFunction } from "express";
// import Cart, { getCart } from "../models/cart_mysql";
import Cart from "../models/cart";
import { getCart } from "../controller/cart";

const router = Router();

// todo: 카드가져오기
router.get("/", getCart);

// todo: 카트넣기
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const { id, price, quentity } = req.body;
	console.log(id, price, quentity);

	if (!id || !price || !quentity) {
		res.status(400).redirect("/");
	}
	const cart = await req.user.getCart();
	const products = await cart?.getProducts({ where: { id: id } });
	console.log(products);
	//const cart = await getCart();
	// await Cart.addProduct(id, parseInt(price), parseInt(quentity));

	res.status(200).redirect("/");
});

export default router;
