// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "authexamnotes-b684d.firebaseapp.com",
  projectId: "authexamnotes-b684d",
  storageBucket: "authexamnotes-b684d.firebasestorage.app",
  messagingSenderId: "929401507939",
  appId: "1:929401507939:web:c5504cd7e686e0925e2856"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}