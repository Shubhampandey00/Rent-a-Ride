import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rent-a-ride-5dd83.firebaseapp.com",
  projectId: "rent-a-ride-5dd83",
  storageBucket: "rent-a-ride-5dd83.firebasestorage.app",
  messagingSenderId: "215065408350",
  appId: "1:215065408350:web:e08dd139270cc2922795cf",
  measurementId: "G-1JNN8NSL49",
};

export const app = initializeApp(firebaseConfig);