import { Employee, Shift } from "./types";
import * as tools from "./tools";

export const generateShiftReport = (
	users: Employee[],
	shifts: Shift[],
	deviceType: "computer" | "mobile"
) => {
	const rowsHtml = shifts
		.map((shift) => {
			const user = users.find((u) => u.id === shift.userId);
			const userName = user
				? `${user.firstName} ${user.lastName}`
				: "Unknown User";
			const dateRange = tools.getDisplayDateRange(
				shift.startDateTime,
				shift.endDateTime
			);

			if (deviceType === "mobile") {
				return `<tr><td>
				<strong>Shift:</strong> ${shift.name}<br/>
				<strong>Date:</strong> ${dateRange}<br/>
				<strong>User:</strong> ${userName}
				</td></tr>`;
			} else {
				return `<tr>
			<td>${shift.name}</td>
			<td>${dateRange}</td>
			<td>${userName}</td>
			</tr>`;
			}
		})
		.join("");
	return `<table>${rowsHtml}</table>`;
};
