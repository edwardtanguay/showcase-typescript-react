import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { dbService } from "../../services/dbService";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const employees = await dbService.getEmployees();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ error: "GET /employees fetch error: " + error.message });
	}
});

employeeRouter.get("/:id", authenticateToken, async (req, res) => {
	try {
		const id = Number(req.params.id);
		const employee = await dbService.getEmployeeById(id);
		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}
		res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({ error: "Error fetching employee" });
	}
});

employeeRouter.post("/", authenticateToken, async (req, res) => {
	try {
		const result = await dbService.createEmployee(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: "Error creating employee" });
	}
});

employeeRouter.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const id = Number(req.params.id);
		const deletedEmployee = await dbService.deleteEmployee(id);
		if (deletedEmployee === null) {
			return res.status(404).json({ error: "Employee not found" });
		}
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ error: "Error deleting employee" });
	}
});

employeeRouter.put("/:id", authenticateToken, async (req, res) => {
	try {
		const id = Number(req.params.id);
		const result = await dbService.updateEmployee(id, req.body);
		if (!result || (Array.isArray(result) && result.length === 0)) {
			return res.status(404).json({ error: "Employee not found" });
		}
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: "Error updating employee:" });
	}
});
