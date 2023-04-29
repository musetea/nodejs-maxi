import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import {
	getProducts,
	addProduct,
	removeProduct,
	getAddProduct,
	getEditProduct,
	getProductById,
} from "../controller/products";
import { postProduct } from "../controller/products";

const router = Router();

const baseDir = path.join(__dirname, "../views");

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/add", getAddProduct);
router.post("/delete/:id", removeProduct); // form 에서는 delete, patch 메소드 지원안함.
router.post("/edit/:id", postProduct);
router.get("/edit/:id", getEditProduct);
//router.get("/:id", getProductById);

export default router;
