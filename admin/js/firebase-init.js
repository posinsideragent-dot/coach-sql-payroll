// This admin site is NOT wrapped by SEB (that's the whole point of keeping
// it separate from the candidate site), so there's no reason to vendor the
// SDK locally — loading straight from Google's CDN is simpler to maintain.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, updateDoc, deleteDoc, addDoc,
  getDoc, getDocs, onSnapshot, query, where, orderBy, serverTimestamp,
  writeBatch,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  collection, doc, setDoc, updateDoc, deleteDoc, addDoc, getDoc, getDocs,
  onSnapshot, query, where, orderBy, serverTimestamp, writeBatch,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
};
