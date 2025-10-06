// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGL6_CAVtbI9xWiGGa8q7nGpdUzoug7Os",
  authDomain: "e-library-4f5bc.firebaseapp.com",
  projectId: "e-library-4f5bc",
  storageBucket: "e-library-4f5bc.firebasestorage.app",
  messagingSenderId: "519937428099",
  appId: "1:519937428099:web:4a6c0a0ae0e6411e1669b6",
  measurementId: "G-Q4PKM2EMJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);