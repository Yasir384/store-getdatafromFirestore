import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBlSulb6JaKmHSkL3ZM-bb95WQCmGFcrc",
  authDomain: "firstlogin-bd3e6.firebaseapp.com",
  projectId: "firstlogin-bd3e6",
  storageBucket: "firstlogin-bd3e6.firebasestorage.app",
  messagingSenderId: "827029345811",
  appId: "1:827029345811:web:83a793633437a53d74d1e6",
  measurementId: "G-DDNS6Q9TF4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);