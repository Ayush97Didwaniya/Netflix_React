import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((store) => {
		console.log("Header store selector", store);
		// @ts-ignore
		return store.user;
	});
	console.log("header user", user);
	const handleSignOut = () =>
		signOut(auth)
			.then(() => {
				removeUser();
				navigate("/");
				// Sign-out successful.
			})
			.catch((error) => {
				navigate("/error");
				// An error happened.
			});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("onAuthStateChanged", user);
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoUrl: photoURL,
					})
				);
				navigate("/browse");
			} else {
				// User is signed out
				dispatch(removeUser(null));
				navigate("/");
			}
		});

		console.log("header use effect called");
		// Unsubscribe when component unmounts
		return () => unsubscribe();
	}, []);

	return (
		<div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
			<img className="w-44" src={LOGO} alt="logo" />
			{user && (
				<div className="flex p-2 m-2">
					<img className="w-12 h-12" src={user?.photoUrl} alt="User Icon" />
					<button onClick={handleSignOut} className="font-bold text-white">
						(Sign Out)
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
