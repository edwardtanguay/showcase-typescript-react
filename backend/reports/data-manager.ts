import * as config from "./../config"
import axios from "axios";

export const getItems = async <T>(route: string): Promise<T[]> => {
	return new Promise<T[]>((resolve, reject) => {
		const backendUrl = `http://localhost:${config.getPort()}`;
		const token = config.getToken();

		(async () => {
			try {
				const response = await axios.get(`${backendUrl}/${route}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const users = response.data;
				resolve(users);
			} catch (error: unknown) {
				if (
					typeof error === "object" &&
					error !== null &&
					"response" in error
				) {
					const axiosError = error as {
						response?: { data?: { error?: string } };
					};
					reject({
						message:
							axiosError.response?.data?.error ||
							"Error fetching users",
					});
				} else {
					reject({ message: "Unknown error fetching users" });
				}
			}
		})();
	});
};
