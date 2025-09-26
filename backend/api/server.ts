import express from "express";
import cors from "cors";
import { employeeRouter } from "./routers/employeeRouter";
import { userRouter } from "./routers/userRouter";
import { shiftRouter } from "./routers/shiftRouter";
import * as config from './config'

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Unauthorized: No token provided" });
	}
	const token = authHeader.split(" ")[1];
	if (config.getToken() !== token) {
		return res.status(403).json({ error: "Forbidden: Invalid token" });
	}

	res.json({
		appName: "API Version 0.4",
	});
});

app.use("/employees", employeeRouter);
app.use("/users", userRouter);
app.use("/shifts", shiftRouter);