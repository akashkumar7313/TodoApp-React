// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI6PZqzH-E89CoxPageZph7wVxNPfEHg",
  authDomain: "reacttodoetp-fa84c.firebase's.com",
  projectId: "reacttodoetp-fa84c",
  storageBucket: "reacttodoetp-fa84c.apps.com",
  messagingSenderId: "1076636769497",
  appId: "1:1076636769497:web:f4805169dbc1fd0b99b2c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);