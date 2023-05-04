import { Router } from "express";
import {
	getLogin,
	postLogin,
	postLogout,
	postNewPassword,
} from "../controller/auth";
import { getSingup, postSignup } from "../controller/auth";
import {
	getResetPassword,
	postResetPassword,
	getNewPassword,
} from "../controller/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSingup);
router.post("/signup", postSignup);
router.get("/reset", getResetPassword);
router.post("/reset", postResetPassword);
router.get("/reset/:token", getNewPassword);
router.post("/new-password", postNewPassword);

export default router;
