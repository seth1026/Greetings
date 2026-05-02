// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOE22Qe46mg4LYKNmuABmtc15eH9WVtFE",
  authDomain: "greetings-app-nikhil.firebaseapp.com",
  projectId: "greetings-app-nikhil",
  storageBucket: "greetings-app-nikhil.firebasestorage.app",
  messagingSenderId: "501375286726",
  appId: "1:501375286726:web:b76f104eed5882f89486c7",
  measurementId: "G-3HG4JB85KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;