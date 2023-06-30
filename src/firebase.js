// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBetzVxDfmRPEvO3tMQbpQkN9a7lnqw7A",
  authDomain: "direct-connect-7406b.firebaseapp.com",
  projectId: "direct-connect-7406b",
  storageBucket: "direct-connect-7406b.appspot.com",
  messagingSenderId: "980307074394",
  appId: "1:980307074394:web:515650074522507cf66763",
  measurementId: "G-55S9JZGWKM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;