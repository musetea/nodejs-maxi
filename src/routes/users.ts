import { Router } from "express";
import { getUsers } from "../controller/users";

const router = Router();

router.get("/", async (req, res, next) => {
	res.render("users", {
		docTitle: "사용자 관리",
		users: getUsers(),
		path: "Users",
	});
});
router.post("/", async (req, res, next) => {
	res.redirect("/users");
});

export default router;
