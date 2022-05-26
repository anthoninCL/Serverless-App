// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuua6PoioSm5KyNwvL3r2WvZS2OUQWbx4",
    authDomain: "messengerserverless.firebaseapp.com",
    projectId: "messengerserverless",
    storageBucket: "messengerserverless.appspot.com",
    messagingSenderId: "19275253661",
    appId: "1:19275253661:web:899522d2f4505579ae9174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const user = await signInWithEmailAndPassword(auth, "john.doe@email.com", "test123");

console.log(user)