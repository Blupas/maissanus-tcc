import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Para autenticação
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore"; // Para Firestore

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANtTilF-mjEYuiXPV7ovzEcwz9Pfp31e0",
  authDomain: "maissanustcc.firebaseapp.com",
  projectId: "maissanustcc",
  storageBucket: "maissanustcc.appspot.com", // Corrigido o "storageBucket" com o domínio correto
  messagingSenderId: "762515831979",
  appId: "1:762515831979:web:4e058f435509eb7cc54bee",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Serviços Firebase
const authFirebase = getAuth(app);
const db = getFirestore(app);

// Exportando os serviços e métodos
export {
  authFirebase,
  db,
  doc,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  getDocs,
};
