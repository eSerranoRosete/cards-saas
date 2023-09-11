// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8LWiFC41sEralfdNK8zi0iTzXeOyAQuw",
  authDomain: "inteminer-26db4.firebaseapp.com",
  projectId: "inteminer-26db4",
  storageBucket: "inteminer-26db4.appspot.com",
  messagingSenderId: "1009237995097",
  appId: "1:1009237995097:web:0f3998c26e1a218cb4cb48",
  measurementId: "G-TSV2MGFN3Z",
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebaseApp);
