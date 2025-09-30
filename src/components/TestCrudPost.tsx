import * as config from "../config";

const backendUrl = config.backendUrl();
const token = config.getToken();

export const TestCrudPost = () => {

	const handleCreateEmployee = async () => {
		const employee = {
			firstName: 'Jan',
			lastName: 'Frontoid',
			age: 25
		}
		try {
			const response = await fetch(`${backendUrl}/employees`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(employee)
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('Error creating employee:', error);
		}
	}

	return (
		<div className="areaTestCrud" >
			<h2>POST</h2>
			<button onClick={handleCreateEmployee}>Create Employee</button>
		</div>
	);
}