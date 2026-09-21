// Central Firebase init — every other module imports { db } from here.
//
// The Firebase SDK is vendored locally under vendor/firebase/ rather than
// loaded from Google's gstatic.com CDN. This is deliberate: this app is
// meant to run inside SEB (Safe Exam Browser), and a locked-down SEB
// profile with URL filtering enabled can block requests to any domain
// other than the exam URL itself — vendoring means the whole app loads
// from one origin (this GitHub Pages site) with no external CDN calls.
import { initializeApp } from "../vendor/firebase/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, updateDoc, onSnapshot,
  serverTimestamp, arrayUnion, getDoc, getDocs, addDoc, deleteDoc,
  query, where, writeBatch,
} from "../vendor/firebase/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {
  collection, doc, setDoc, updateDoc, onSnapshot, serverTimestamp, arrayUnion, getDoc,
  getDocs, addDoc, deleteDoc, query, where, writeBatch,
};
