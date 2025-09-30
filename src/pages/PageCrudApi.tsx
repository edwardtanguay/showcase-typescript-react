import axios from "axios";
import { useEffect, useState } from "react";
import { Employee } from "../types";
import { FaSpinner } from "react-icons/fa6";
import * as config from "../config";
import { TestCrudPost } from "../components/TestCrudPost";
import { TestCrudDelete } from "../components/TestCrudDelete";

const backendUrl = config.backendUrl();
const token = config.getToken();

export const PageCrudApi = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [routesLoaded, setRoutesLoaded] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`${backendUrl}/employees`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setEmployees(data);
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
						"Error fetching employees"
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
			{routesLoaded < 1 ? (
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
							<p>There are {employees.length} employees:</p>
							<ul className="list-disc list-inside ml-3">
								{employees.map((employee) => (
									<li
										key={employee.id}
										className="font-mono text-orange-950 font-semibold"
									>
										<span className="">
											{employee.firstName}{" "}
											{employee.lastName} (age: {employee.age})
										</span>
									</li>
								))}
							</ul>
						</>
					)}
				</>
			)}

			<TestCrudPost />
			<TestCrudDelete setErrorMessage={setErrorMessage} />
		</>
	);
};
