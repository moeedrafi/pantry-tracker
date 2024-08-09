import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0cXs82eJG5pSuXfCyGyvWTYdy5RxGKKk",
  authDomain: "inventory-tracker-6be74.firebaseapp.com",
  projectId: "inventory-tracker-6be74",
  storageBucket: "inventory-tracker-6be74.appspot.com",
  messagingSenderId: "190146976434",
  appId: "1:190146976434:web:eb49835c663d162961c7ab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
