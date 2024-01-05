import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGZvZsd1iKguRJYO-0az8dQI0IjyEckRo",
  authDomain: "anz-driver-ops-ritu.firebaseapp.com",
  projectId: "anz-driver-ops-ritu",
  storageBucket: "anz-driver-ops-ritu.appspot.com",
  messagingSenderId: "996888346828",
  appId: "1:996888346828:web:e89e463e7e15913d378269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
