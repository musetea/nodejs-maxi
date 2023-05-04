import { Router } from "express";
import { getLogin, postLogin, postLogout } from "../controller/auth";
import { getSingup, postSignup } from "../controller/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSingup);
router.post("/signup", postSignup);

export default router;
