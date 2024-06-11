// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlyIMln0rwtv3aA18r7tdKQAPuszUr5dc",
  authDomain: "contact-application-29592.firebaseapp.com",
  projectId: "contact-application-29592",
  storageBucket: "contact-application-29592.appspot.com",
  messagingSenderId: "462738132569",
  appId: "1:462738132569:web:2565a12013e27615b76b48"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
