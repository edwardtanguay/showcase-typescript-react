import { NavLink } from "react-router-dom";
import { useTypedStoreState } from "../store/hooks";

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);

	return (
		<>
			<p className="mb-3">{message}</p>
			<ul className="mb-3 list-disc ml-6">
				<li>See the <NavLink className="underline" to="/crud">frontend form project</NavLink> which allows the user to edit and delete items from frontend. Backend data is in SQLite.
				</li>
			</ul>
		</>
	);
};
