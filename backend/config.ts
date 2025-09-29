import dotenv from 'dotenv';

dotenv.config();

export const getPort = () => {
	return process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 9999;
}

export const getToken = () => {
	return process.env.VITE_TOKEN || "";
}