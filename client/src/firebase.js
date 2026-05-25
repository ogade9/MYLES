// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgFIU8ZKs1MPeS_b-XJKA-C7-4TJ5eGNs",
  authDomain: "myles-a7376.firebaseapp.com",
  projectId: "myles-a7376",
  storageBucket: "myles-a7376.firebasestorage.app",
  messagingSenderId: "731404808372",
  appId: "1:731404808372:web:45be5f1b5e5f7599f067e1",
  measurementId: "G-PCG0KPMRW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


