export const getPort = () => {
	return import.meta.env.VITE_PORT ? Number(import.meta.env.VITE_PORT) : 9999;
};

export const getToken = () => {
	return import.meta.env.VITE_TOKEN || "";
};

export const backendUrl = () => `http://localhost:${getPort()}`;
