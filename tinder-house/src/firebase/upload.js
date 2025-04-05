// upload.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import data from './your_json_file.json'; // converted Kaggle data

const firebaseConfig = {
    apiKey: "AIzaSyCMP0-BW-cPhYAE_IufpacExYgrmHJN4X8",
  authDomain: "tinder-house.firebaseapp.com",
  projectId: "tinder-house",
  storageBucket: "tinder-house.firebasestorage.app",
  messagingSenderId: "970532270294",
  appId: "1:970532270294:web:7aa41edb2cb4728ea51977"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadData = async () => {
  const colRef = collection(db, 'listings');

  for (let house of data) {
    await addDoc(colRef, house);
  }

  console.log("Uploaded!");
};

uploadData();