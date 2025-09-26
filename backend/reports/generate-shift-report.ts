import { getItems } from "./data-manager";
import * as tools from "./tools";
import { Shift, Employee } from "./types";
import * as contentManager from "./content-manager";

try {
	const users = await getItems<Employee>("employees");
	const shifts = await getItems<Shift>("shifts");

	const templateHtmlPathAndFileName = "backend/reports/report-template.html";
	const outputHtmlPathAndFileName =
		"backend/reports/output/shift-report.html";

	const htmlTemplateContent = tools.readFile(templateHtmlPathAndFileName);
	let html = htmlTemplateContent;
	html = html.replace(
		"<!--COMPUTERCONTENT-->",
		contentManager.generateShiftReport(users, shifts, "computer")
	);
	html = html.replace(
		"<!--MOBILECONTENT-->",
		contentManager.generateShiftReport(users, shifts, "mobile")
	);
	tools.writeFile(outputHtmlPathAndFileName, html);

	console.log(`Shift report generated at: ${outputHtmlPathAndFileName}`);
} catch (error) {
	if (error && typeof error === "object" && "message" in error) {
		console.error(
			"Error generating shift report:",
			(error as { message: string }).message
		);
	} else {
		console.error("Unknown error generating shift report");
	}
}
