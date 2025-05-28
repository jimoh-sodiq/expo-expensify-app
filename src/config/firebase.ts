// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnTthol6pvXFrRmkdaYtv4GWodTO2EzJ0",
  authDomain: "expense-tracker-27686.firebaseapp.com",
  projectId: "expense-tracker-27686",
  storageBucket: "expense-tracker-27686.firebasestorage.app",
  messagingSenderId: "1028062116645",
  appId: "1:1028062116645:web:344a7ce07d441fee40f8cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore =  getFirestore(app)
