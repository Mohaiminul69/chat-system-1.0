import firebase from "./firebase";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy9sM7n9zRaTxLitrqRg-oC_fx2fYD6EM",
  authDomain: "chat-system-995e1.firebaseapp.com",
  projectId: "chat-system-995e1",
  storageBucket: "chat-system-995e1.appspot.com",
  messagingSenderId: "739817086248",
  appId: "1:739817086248:web:2e6814fa7642e31d37c41d",
};

// Initialize Firebase
const app = !firebase ? initializeApp(firebaseConfig) : firebase.app();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
