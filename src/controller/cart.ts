import { Request, Response, NextFunction } from "express";

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(200).render("cart", {
		docPage: "cart",
		path: "cart",
	});
};
