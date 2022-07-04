import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAziW0JbE3qBWSDaVlTtoR2ZYMfnc_3IBY",
  authDomain: "next-auth-68192.firebaseapp.com",
  projectId: "next-auth-68192",
  storageBucket: "next-auth-68192.appspot.com",
  messagingSenderId: "735967525715",
  appId: "1:735967525715:web:2da293feb4e86c9967bfa6",
  measurementId: "G-LQ5NZ3PYC6"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth()

