import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxI5-oBtayqxqmZvxsI2ShP0DJVL7Lhkw",
  authDomain: "practica-1-15f23.firebaseapp.com",
  projectId: "practica-1-15f23",
  storageBucket: "practica-1-15f23.appspot.com",
  messagingSenderId: "1089512524622",
  appId: "1:1089512524622:web:3086235f764110e27bac1f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getFirestore(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail };
