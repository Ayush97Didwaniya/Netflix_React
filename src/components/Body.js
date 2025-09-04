import Login from "../components/Login";
import Browse from "../components/Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Body = () => {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/browse",
			element: <Browse />,
		},
	]);

	return (
		<div className="">
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default Body;
