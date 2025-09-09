import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const showGptSearch = useSelector((store) => {
		return store.gpt.showGptSearch;
	});
	const user = useSelector((store) => {
		return store.user;
	});
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

		// Unsubscribe when component unmounts
		return () => unsubscribe();
	}, []);

	const handleGptSearchClick = () => {
		// Toggle GPT Search button
		dispatch(toggleGptSearchView(!showGptSearch));
	};

	const handleLanguageChange = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	return (
		<div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
			<img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
			{user && (
				<div className="flex p-2 justify-between m-2">
					{showGptSearch && (
						<select
							className="p-2 m-2 bg-gray-500"
							onChange={handleLanguageChange}
						>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option key={lang.identifier} value={lang.identifier}>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="py-2 px-4 text-white bg-purple-800 rounded-lg"
						onClick={handleGptSearchClick}
					>
						{showGptSearch ? "Home" : "GPT Search"}
					</button>
					<img
						className="hidden md:block w-12 h-12 mx-4"
						src={user?.photoUrl}
						alt="User Icon"
					/>
					<button onClick={handleSignOut} className="font-bold text-white">
						(Sign Out)
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
