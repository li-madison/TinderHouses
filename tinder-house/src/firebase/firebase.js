// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMP0-BW-cPhYAE_IufpacExYgrmHJN4X8",
  authDomain: "tinder-house.firebaseapp.com",
  projectId: "tinder-house",
  storageBucket: "tinder-house.firebasestorage.app",
  messagingSenderId: "970532270294",
  appId: "1:970532270294:web:7aa41edb2cb4728ea51977"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, setDoc, getDoc, doc }