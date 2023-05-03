import { Request, Response, NextFunction } from "express";
import Order from "../models/mongoose/order";

export const getOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const items = await req.user.getOrder();
	res.status(200).render("order", {
		path: "order",
		items: items,
	});
};

export const postOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const order = new Order({
		user: {
			name: req.user.name,
			userId: req.user._id,
		},
		products: {},
	});
};
