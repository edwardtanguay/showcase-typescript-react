import { Router } from "express";
import * as config from "../config";

export const shiftRouter = Router();

shiftRouter.get("/", (req, res) => {
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
		{
			name: "Morning Shift",
			startDateTime: "2023-10-01T08:00:00Z",
			endDateTime: "2023-10-01T16:00:00Z",
			userId: 2,
		},
		{
			name: "Evening Shift",
			startDateTime: "2023-10-01T16:00:00Z",
			endDateTime: "2023-10-02T02:00:00Z",
			userId: 4,
		},
		{
			name: "Night Shift",
			startDateTime: "2023-10-01T00:00:00Z",
			endDateTime: "2023-10-01T08:00:00Z",
			userId: 3,
		},
		{
			name: "Weekend Shift",
			startDateTime: "2023-10-07T08:00:00Z",
			endDateTime: "2023-10-07T20:00:00Z",
			userId: 3,
		},
		{
			name: "Holiday Shift",
			startDateTime: "2023-12-25T08:00:00Z",
			endDateTime: "2023-12-25T20:00:00Z",
			userId: null,
		},
	]);
});
