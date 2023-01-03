// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth'
import "firebase/storage"
import "firebase/compat/firestore"
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1wHIV3_Uv772r_mzNNHrJEBevOLR7XkA",
  authDomain: "rlgouvea-a860e.firebaseapp.com",
  projectId: "rlgouvea-a860e",
  storageBucket: "rlgouvea-a860e.appspot.com",
  messagingSenderId: "1057327392884",
  appId: "1:1057327392884:web:c76f326e6eac30a68dc921"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = getAuth(app)

export {db, firebaseConfig, auth}