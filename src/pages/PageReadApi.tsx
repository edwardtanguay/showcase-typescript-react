import axios from "axios";
import { useEffect, useState } from "react";
import { Employee } from "../types";

const backendUrl = "http://localhost:4233";

export const PageReadApi = () => {
	const [appName, setAppName] = useState("testing");
	const [employees, setEmployees] = useState<Employee[]>([]);

	useEffect(() => {
		(async () => {
			// Version with FETCH
			const response = await fetch(`${backendUrl}`);
			const data = await response.json();
			setAppName(data.appName);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			// Version with AXIOS
			const response = await axios.get(`${backendUrl}/employees`);
			const data = response.data;
			setEmployees(data);
		})();
	}, []);

	return (
		<>
			<p className="mb-3">App Name: <span className="font-mono text-orange-950 font-semibold">{appName}</span></p>
			<p>There are {employees.length} Employees:</p>
			<ul className="list-disc list-inside ml-3">
				{employees.map((emp) => (
					<li key={emp.id} className="font-mono text-orange-950 font-semibold">
						<span className="">{emp.name}</span> - {emp.position}
					</li>
				))}
			</ul>
		</>
	);
};
