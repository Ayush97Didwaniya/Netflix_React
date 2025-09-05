import Header from "../components/Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, BG_URL } from "../utils/constants";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	const handleButttonClick = () => {
		// Validate the form data
		const message = checkValidData(email.current.value, password.current.value);
		setErrorMessage(message);

		console.log(message);
		if (message) return;

		//Sign In Sign up Logic
		if (!isSignInForm) {
			console.log("Inside sign Up");
			// Sign Up Logic
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					console.log(user);
					// update user
					updateProfile(user, {
						displayName: name.current.value,
						photoURL: USER_AVATAR,
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } = auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoUrl: photoURL,
								})
							);
						})
						.catch((error) => {
							setErrorMessage(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + " - " + errorMessage);
					console.log("error", error);
				});
		} else {
			// Sign In Logic
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					navigate("/browse");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + " - " + errorMessage);
					console.log("error", error);
				});
		}
	};

	return (
		<div className="">
			<Header></Header>
			<div className="absolute">
				<img
					className="bg-center bg-cover inset-0 h-screen"
					src={BG_URL}
					alt="logo"
				/>
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="w-6/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
			>
				<h1 className="font-bold text-3xl py-4">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>
				{!isSignInForm && (
					<input
						type="text"
						ref={name}
						placeholder="Full Name"
						className="p-4 my-2 w-full bg-gray-800 rounded-lg"
					/>
				)}
				<input
					type="text"
					ref={email}
					placeholder="Email Address"
					className="p-4 my-2 w-full bg-gray-800 rounded-lg"
				/>
				<input
					type="password"
					ref={password}
					placeholder="Password"
					className="p-4 my-2 w-full bg-gray-800 rounded-lg"
				/>
				<p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
				<button
					className="p-4 my-6 bg-red-700 w-full"
					onClick={handleButttonClick}
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
					{isSignInForm
						? "New to Netflix? Sign Up Now"
						: "Already registered? Sign In Now."}
				</p>
			</form>
		</div>
	);
};

export default Login;
