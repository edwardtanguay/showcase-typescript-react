import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

export const employeeRouter = Router();

const employees = [
	{ id: 1, firstName: "Max", lastName: "Rochet", age: 29 },
	{ id: 2, firstName: "Julia", lastName: "Schneider", age: 34 },
	{ id: 3, firstName: "Lena", lastName: "Fischer", age: 28 },
	{ id: 4, firstName: "Thomas", lastName: "Weber", age: 45 },
	{ id: 5, firstName: "Sophie", lastName: "Meyer", age: 31 },
	{ id: 6, firstName: "Leon", lastName: "Wagner", age: 26 },
	{ id: 7, firstName: "Anna", lastName: "Becker", age: 38 },
	{ id: 8, firstName: "Ralf", lastName: "Zenter", age: 30 },
];

employeeRouter.post("/", authenticateToken, (req, res) => {
	console.log("Creating employee:", req.body);
	res.status(201).json({ message: "Employee created" });
});

employeeRouter.delete("/:id", authenticateToken, (req, res) => {
	console.log("Deleting employee with ID:", req.params.id);
	res.status(200).json({
		message: `Deleted employee with ID ${req.params.id}`,
	});
});

employeeRouter.put("/:id", authenticateToken, (req, res) => {
	console.log("Replacing employee with ID:", req.params.id);
	console.log("with this data:", req.body);
	res.status(200).json({
		message: `Updated employee with ID ${req.params.id}`,
	});
});

employeeRouter.get("/", authenticateToken, (req, res) => {
	res.status(200).json(employees);
});

employeeRouter.get("/:id", authenticateToken, (req, res) => {
	const id = Number(req.params.id);
	const employee = employees.find((emp) => emp.id === id);
	if (!employee) {
		return res.status(404).json({ error: "Employee not found" });
	}
	res.status(200).json(employee);
});
