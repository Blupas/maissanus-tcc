import { getApp, initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKoUrkAjZvGOgynQKmHT99SbdbN-LdHLI",
  authDomain: "maissanus.firebaseapp.com",
  projectId: "maissanus",
  storageBucket: "maissanus.firebasestorage.app",
  messagingSenderId: "993152237087",
  appId: "1:993152237087:web:ec634039d7e40d452edf2a"
};

initializeApp(firebaseConfig);

const app = getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
