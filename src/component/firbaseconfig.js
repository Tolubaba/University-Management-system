 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwpK4qJFnhW0UBOWUgu65AEKYDks8BYis",
  authDomain: "frontend-project-b0f14.firebaseapp.com",
  projectId: "frontend-project-b0f14",
  storageBucket: "frontend-project-b0f14.appspot.com",
  messagingSenderId: "619272944494",
  appId: "1:619272944494:web:94da1906cc3cad5f1f5f7f",
  measurementId: "G-EJJQ216D1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

setPersistence(auth, browserSessionPersistence)

export { auth, db, storage }