// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, useDeviceLanguage } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWXJD0qPs8ZWu7hZfF_dGMGX_m_iJaydM",
  authDomain: "management-d6b92.firebaseapp.com",
  projectId: "management-d6b92",
  storageBucket: "management-d6b92.appspot.com",
  messagingSenderId: "974236226392",
  appId: "1:974236226392:web:5fe219cceb66c91cfecb2d",
  measurementId: "G-P1D984G9FT",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
