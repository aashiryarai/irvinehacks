// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoV2u9jWTU1grDa_M7Jd67dSF0Y9DKK1M",
  authDomain: "recipefinder-irvinehacks.firebaseapp.com",
  projectId: "recipefinder-irvinehacks",
  storageBucket: "recipefinder-irvinehacks.firebasestorage.app",
  messagingSenderId: "14813484314",
  appId: "1:14813484314:web:ea19cdb4e172442536c8a3",
  measurementId: "G-LEYHZVG02M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);