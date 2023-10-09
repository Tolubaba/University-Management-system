 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);