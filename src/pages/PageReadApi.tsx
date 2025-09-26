import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types";
import { FaSpinner } from "react-icons/fa6";

const backendUrl = "http://localhost:3388";
const token = "abcde12345";

export const PageReadApi = () => {
	const [appName, setAppName] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [routesLoaded, setRoutesLoaded] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		(async () => {
			// Version with FETCH
			const response = await fetch(`${backendUrl}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (response.ok) {
				setAppName(data.appName);
			} else {
				setErrorMessage(data.error || "Error fetching app name");
			}
			setTimeout(() => {
				setRoutesLoaded((prev) => prev + 1);
			}, 1000);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			// Version with AXIOS
			try {
				const response = await axios.get(`${backendUrl}/users`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setUsers(data);
			} catch (error: unknown) {
				if (
					typeof error === "object" &&
					error !== null &&
					"response" in error
				) {
					const axiosError = error as {
						response?: { data?: { error?: string } };
					};
					setErrorMessage(
						axiosError.response?.data?.error ||
							"Error fetching users"
					);
				} else {
					setErrorMessage("Unknown error fetching users");
				}
			}
			setTimeout(() => {
				setRoutesLoaded((prev) => prev + 1);
			}, 1000);
		})();
	}, []);

	return (
		<>
			{routesLoaded < 2 ? (
				<FaSpinner className="animate-spin text-[3rem] text-slate-600" />
			) : (
				<>
					{errorMessage && (
						<p className="mb-3 text-red-500 bg-black flex justify-center text-lg uppercase">
							{errorMessage}
						</p>
					)}
					{!errorMessage && (
						<>
							<p className="mb-3">
								App Name:{" "}
								<span className="font-mono text-orange-950 font-semibold">
									{appName}
								</span>
							</p>
							<p>There are {users.length} users:</p>
							<ul className="list-disc list-inside ml-3">
								{users.map((user) => (
									<li
										key={user.id}
										className="font-mono text-orange-950 font-semibold"
									>
										<span className="">{user.name}</span> -{" "}
										{user.position}
									</li>
								))}
							</ul>
						</>
					)}
				</>
			)}
		</>
	);
};
