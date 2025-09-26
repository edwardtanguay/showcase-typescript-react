import * as fs from "fs";

export const writeFile = (pathAndFileName: string, content: string) => {
	fs.writeFileSync(pathAndFileName, content, "utf8");
};

export const readFile = (pathAndFileName: string): string => {
	return fs.readFileSync(pathAndFileName, "utf8");
};

/**
 * Determines the display format for a date range based on whether the start
 * and end times fall on the same local date.
 *
 * NOTE: Dates are parsed as UTC and automatically converted to the user's
 * local time zone for comparison and display.
 */
export const getDisplayDateRange = (
	startIsoString: string,
	endIsoString: string
): string => {
	const startDate = new Date(startIsoString);
	const endDate = new Date(endIsoString);

	// --- Format Helpers ---

	// Formatter for the full date part (e.g., "Friday, Oct 4")
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
	});

	// Formatter for the time part (e.g., "18:00")
	const timeFormatter = new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23", // Ensures 24-hour time format
	});

	// Helper function to check if two dates are on the same local day
	const isSameLocalDay = (d1: Date, d2: Date): boolean => {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};

	// --- Main Logic ---

	const startDatePart = dateFormatter.format(startDate);
	const startTimePart = timeFormatter.format(startDate);
	const endTimePart = timeFormatter.format(endDate);

	if (isSameLocalDay(startDate, endDate)) {
		// Case 1: Same Day (e.g., "Friday, Oct 4 18:00 - 20:00")
		return `${startDatePart} ${startTimePart} - ${endTimePart}`;
	} else {
		// Case 2: Different Day (e.g., "Friday, Oct 4 22:00 - Saturday, Oct 5 02:00")
		const endDatePart = dateFormatter.format(endDate);

		return `${startDatePart} ${startTimePart} - ${endDatePart} ${endTimePart}`;
	}
};
