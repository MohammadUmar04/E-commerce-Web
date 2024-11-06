import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4nI3ybTZe1xuU58H8OeoQfnmxzjq-2DY",
    authDomain: "e-commerce-b92bf.firebaseapp.com",
    projectId: "e-commerce-b92bf",
    storageBucket: "e-commerce-b92bf.firebasestorage.app",
    messagingSenderId: "760478209186",
    appId: "1:760478209186:web:2840a9ffefa666b9b8b3fb",
    measurementId: "G-JN97STGRJT"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
