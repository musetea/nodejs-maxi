import { Request, Response, NextFunction } from "express";

export const getOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(200).render("order", {
		path: "order",
	});
};
