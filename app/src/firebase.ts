import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuua6PoioSm5KyNwvL3r2WvZS2OUQWbx4",

  authDomain: "messengerserverless.firebaseapp.com",

  projectId: "messengerserverless",

  storageBucket: "messengerserverless.appspot.com",

  messagingSenderId: "19275253661",

  appId: "1:19275253661:web:899522d2f4505579ae9174",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export default app;

const auth = getAuth();
export { auth };
