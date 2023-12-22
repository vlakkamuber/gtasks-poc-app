import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOvJEpRDPydDvopneapu5Cy_YDoXWi2V8",
  authDomain: "data-collection-app-90cc6.firebaseapp.com",
  projectId: "data-collection-app-90cc6",
  storageBucket: "data-collection-app-90cc6.appspot.com",
  messagingSenderId: "439127008924",
  appId: "1:439127008924:web:f3252b9336d5bf7ae3ef59",
  measurementId: "G-KWPTZ4WH8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
