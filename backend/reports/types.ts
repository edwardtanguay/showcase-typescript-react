export type Employee = {
	id: number;
	firstName: string;
	lastName: string;
};

export type Shift = {
	name: string;
	startDateTime: string;
	endDateTime: string;
	userId: number | null;
};
