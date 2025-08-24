// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCijJjpop4ZkwgshbO0oMvU9wR14TkElrQ",
	authDomain: "netflixgpt-1e7b7.firebaseapp.com",
	projectId: "netflixgpt-1e7b7",
	storageBucket: "netflixgpt-1e7b7.firebasestorage.app",
	messagingSenderId: "114558772095",
	appId: "1:114558772095:web:d2a45dd10767dac4c6f04a",
	measurementId: "G-SCZ7QRH7Z6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth()
