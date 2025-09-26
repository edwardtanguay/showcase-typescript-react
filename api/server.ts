import express from "express";
import cors from "cors";
import { employeeRouter } from './routers/employeeRouter';

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.3",
	});
});

app.use('/employees', employeeRouter);
