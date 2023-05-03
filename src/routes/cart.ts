import { Router, Request, Response, NextFunction } from "express";
// import Cart, { getCart } from "../models/cart_mysql";
import Cart from "../models/cart";
import { addCart, getCart, removeFromCart } from "../controller/cart";

const router = Router();

// todo: 카드가져오기
router.get("/", getCart);

// todo: 카트넣기
router.post("/", addCart);
router.post("/delete", removeFromCart);

export default router;
