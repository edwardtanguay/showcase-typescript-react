import * as config from "../config";

const backendUrl = config.backendUrl();
const token = config.getToken();

type Props = {
	setErrorMessage: (message: string) => void;
};

export const TestCrudDelete = ({ setErrorMessage }: Props) => {
	const handleDeleteEmployee = async () => {
		try {
			const response = await fetch(`${backendUrl}/employees/32`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				// throw new Error('Network response was not ok');
				setErrorMessage("Network response was not ok");
			} else {
				const data: { message: string } = await response.json();
				const message = data.message;
				setErrorMessage(message);
			}
		} catch (error) {
			// console.error('Error creating employee:', error);
			setErrorMessage("Error deleting employee");
		}
	};

	return (
		<div className="areaTestCrud">
			<h2>DELETE</h2>
			<button onClick={handleDeleteEmployee}>Delete Employee</button>
		</div>
	);
};
