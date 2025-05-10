import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfk_u6IFOwnv0N-AH_2ifGFlwB-wAGQhM",
  authDomain: "erc-homework.firebaseapp.com",
  projectId: "erc-homework",
  storageBucket: "erc-homework.appspot.com",
  messagingSenderId: "1010524872547",
  appId: "1:1010524872547:web:2c8e13cdcab0553ccb7d56",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
