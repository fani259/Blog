import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEnv("VITE_FIREBASE_API"),
    authDomain: "blog-7140c.firebaseapp.com",
    projectId: "blog-7140c",
    storageBucket: "blog-7140c.firebasestorage.app",
    messagingSenderId: "587550704768",
    appId: "1:587550704768:web:c4283682ed67f2661a1265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }