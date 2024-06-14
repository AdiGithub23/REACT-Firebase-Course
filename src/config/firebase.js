import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAx19S3iaSYag5KCA1DXgzmIkB8DOuiIIA",
  authDomain: "reactfirebasecourse-5397a.firebaseapp.com",
  projectId: "reactfirebasecourse-5397a",
  storageBucket: "reactfirebasecourse-5397a.appspot.com",
  messagingSenderId: "385834343150",
  appId: "1:385834343150:web:415dcd286fdb462a7fb1ff",
  measurementId: "G-LW5177BWZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();