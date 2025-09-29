import { Router } from "express";
import * as config from '../../config'

export const employeeRouter = Router();

employeeRouter.get("/", (req, res) => {
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
		{ id: 1, firstName: "Max", lastName: "Rochet", age: 29 },
		{ id: 2, firstName: "Julia", lastName: "Schneider", age: 34 },
		{ id: 3, firstName: "Lena", lastName: "Fischer", age: 28 },
		{ id: 4, firstName: "Thomas", lastName: "Weber", age: 45 },
		{ id: 5, firstName: "Sophie", lastName: "Meyer", age: 31 },
		{ id: 6, firstName: "Leon", lastName: "Wagner", age: 26 },
		{ id: 7, firstName: "Anna", lastName: "Becker", age: 38 },
	]);
});
