import { Router } from 'express';

export const employeeRouter = Router();

employeeRouter.get('/', (_req, res) => {
	res.json([
		{ id: 1, name: 'Hans Müller', position: 'Softwareentwickler' },
		{ id: 2, name: 'Sabine Schmidt', position: 'Produktmanagerin' },
		{ id: 3, name: 'Klaus Becker', position: 'UX-Designer' },
		{ id: 4, name: 'Anna Fischer', position: 'QA-Ingenieurin' },
	]);
});
