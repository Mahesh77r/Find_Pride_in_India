import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCUj5UdA4Bs6lpK1YfU4Z257BzpJD-Pm8M",
  authDomain: "finding-pride-in-india-9035a.firebaseapp.com",
  projectId: "finding-pride-in-india-9035a",
  storageBucket: "finding-pride-in-india-9035a.appspot.com",
  messagingSenderId: "627739821407",
  appId: "1:627739821407:web:7f9c603b210660df6d62ea",
  measurementId: "G-G7EKHXV3FL"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const imgDB = getStorage();