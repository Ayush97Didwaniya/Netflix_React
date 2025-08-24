import Login from "../components/Login";
import Browse from "../components/Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Body = () => {
	const dispatch = useDispatch();

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

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			console.log(user);
			if (user) {
				// const { uid, email, displayName, photoURL } = user;
				// dispatch(
				// 	addUser({
				// 		uid: uid,
				// 		email: email,
				// 		displayName: displayName,
				// 		photoUrl: photoURL,
				// 	})
				// );
			} else {
				// User is signed out
				dispatch(removeUser());
			}
		});
	}, []);

	return (
		<div className="">
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default Body;
