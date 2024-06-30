import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXNSpRQWeFRnzHEy1mpMxR7uJrlaZRQ1o",
  authDomain: "ebuddy-backend-repo.firebaseapp.com",
  projectId: "ebuddy-backend-repo",
  storageBucket: "ebuddy-backend-repo.appspot.com",
  messagingSenderId: "109355555281",
  appId: "1:109355555281:web:da8a928e04ccedf80328f0",
  measurementId: "G-V2DQM775VZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
