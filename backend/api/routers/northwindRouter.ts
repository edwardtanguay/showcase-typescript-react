import { Router, Request, Response } from "express";
import * as config from "../../config";
import * as tools from "../../tools";

export const northwindRouter = Router();

const getData = (idCode: string, req: Request, res: Response) => {
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
	return tools.readJsonFile(`data/northwind/${idCode}.json`);
};

northwindRouter.get("/categories", (req, res) =>
	res.json(getData("categories", req, res))
);
northwindRouter.get("/customers", (req, res) =>
	res.json(getData("customers", req, res))
);
northwindRouter.get("/employees", (req, res) =>
	res.json(getData("employees", req, res))
);
northwindRouter.get("/orders", (req, res) =>
	res.json(getData("orders", req, res))
);
northwindRouter.get("/products", (req, res) =>
	res.json(getData("products", req, res))
);
northwindRouter.get("/regions", (req, res) =>
	res.json(getData("regions", req, res))
);
northwindRouter.get("/shippers", (req, res) =>
	res.json(getData("shippers", req, res))
);
northwindRouter.get("/suppliers", (req, res) =>
	res.json(getData("suppliers", req, res))
);
