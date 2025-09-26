import axios from "axios";
import { useEffect, useState } from "react";
import { Employee } from "../types";
import { FaSpinner } from "react-icons/fa6";

const backendUrl = "http://localhost:4233";
const token = "4321";

export const PageReadApi = () => {
	const [appName, setAppName] = useState("");
	const [employees, setEmployees] = useState<Employee[]>([]);
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
				const response = await axios.get(`${backendUrl}/employees`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setEmployees(data);
			} catch (error: unknown) {
				if (typeof error === "object" && error !== null && "response" in error) {
					const axiosError = error as { response?: { data?: { error?: string } } };
					setErrorMessage(
						axiosError.response?.data?.error || "Error fetching employees"
					);
				} else {
					setErrorMessage("Unknown error fetching employees");
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
							<p>There are {employees.length} Employees:</p>
							<ul className="list-disc list-inside ml-3">
								{employees.map((emp) => (
									<li
										key={emp.id}
										className="font-mono text-orange-950 font-semibold"
									>
										<span className="">{emp.name}</span> -{" "}
										{emp.position}
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
