// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "evtracker-a9333.firebaseapp.com",
  databaseURL: "https://evtracker-a9333-default-rtdb.firebaseio.com",
  projectId: "evtracker-a9333",
  storageBucket: "evtracker-a9333.firebasestorage.app",
  messagingSenderId: "305865479618",
  appId: "1:305865479618:web:75dfbbfa308b610fe3725b",
  measurementId: "G-0M65ZCZ260"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);