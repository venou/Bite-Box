import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "bite-box-39e21.firebaseapp.com",
  projectId: "bite-box-39e21",
  storageBucket: "bite-box-39e21.appspot.com",
  messagingSenderId: "914715330910",
  appId: "1:914715330910:web:bd213a38a6b229c4e767cf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
