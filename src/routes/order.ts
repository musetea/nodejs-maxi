import { Router, Request, Response, NextFunction } from "express";
import { getOrder } from "../controller/order";
const router = Router();

router.get("/", getOrder);

export default router;
