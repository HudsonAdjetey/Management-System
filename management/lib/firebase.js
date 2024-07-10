"use server";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "school-management-62d6b.firebaseapp.com",
  projectId: "school-management-62d6b",
  storageBucket: "school-management-62d6b.appspot.com",
  messagingSenderId: "540487549255",
  appId: "1:540487549255:web:10ef9f44340ad5a9554c62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "..";
import { useRouter } from "next/navigation";



