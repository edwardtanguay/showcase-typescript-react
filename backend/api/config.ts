import dotenv from 'dotenv';

dotenv.config();

export const getPort = () => {
	return process.env.PORT ? Number(process.env.PORT) : 9999;
}

export const getToken = () => {
	return process.env.TOKEN || "";
}