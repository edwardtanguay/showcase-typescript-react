import { Router } from "express";
import * as config from "../../config";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Unauthorized: No token provided" });
	}
	const token = authHeader.split(" ")[1];
	if (token !== config.getToken()) {
		return res.status(403).json({ error: "Forbidden: Invalid token" });
	}
	res.json([
		{ id: 1, name: "Hans Müller", position: "Softwareentwickler" },
		{ id: 2, name: "Sabine Schmidt", position: "Produktmanagerin" },
		{ id: 3, name: "Klaus Becker", position: "UX-Designer" },
		{ id: 4, name: "Anna Fischer", position: "QA-Ingenieurin" },
	]);
});
