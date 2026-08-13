import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2ML6osTqX3Fyr70HLMS-jYXC-d5nNoW0",
  authDomain: "sneha-gupta-ca-finalist.firebaseapp.com",
  projectId: "sneha-gupta-ca-finalist",
  storageBucket: "sneha-gupta-ca-finalist.firebasestorage.app",
  messagingSenderId: "49008350005",
  appId: "1:49008350005:web:05aae6b0e7042e6698f27c",
  measurementId: "G-JZ5R5PV82R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;