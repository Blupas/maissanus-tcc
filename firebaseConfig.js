import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';  // Para autenticação
import { getFirestore, doc, collection, addDoc, getDocs } from 'firebase/firestore';  // Para Firestore
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyANtTilF-mjEYuiXPV7ovzEcwz9Pfp31e0",
  authDomain: "maissanustcc.firebaseapp.com",
  projectId: "maissanustcc",
  storageBucket: "maissanustcc.firebasestorage.app",
  messagingSenderId: "762515831979",
  appId: "1:762515831979:web:4e058f435509eb7cc54bee"
};

const app = initializeApp(firebaseConfig);

// Inicializando os serviços Firebase
const authFirebase = getAuth(app);
const db = getFirestore(app);

// Função para obter referência ao documento do usuário com o UID
const getUserRef = (uid) => doc(firestore, 'users', uid);

export { 
  authFirebase, 
  db, 
  doc, 
  addDoc, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  collection, 
  getUserRef ,
  getDocs
};
