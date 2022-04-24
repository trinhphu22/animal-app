import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // main firebase
  // -----------------------

  // apiKey: "AIzaSyCsZ7oW9cpIJJcO_ww-aFG8ZlyvVeQ9zMU",
  // authDomain: "article-fcde4.firebaseapp.com",
  // projectId: "article-fcde4",
  // storageBucket: "article-fcde4.appspot.com",
  // messagingSenderId: "254443073699",
  // appId: "1:254443073699:web:ea07bed61b91109d25cf16",

  // sub firebase
  // -----------------------

  apiKey: "AIzaSyAWPpPkbimraMVIAMXy1FTNyOsEdkIDqhU",
  authDomain: "animal-757f1.firebaseapp.com",
  projectId: "animal-757f1",
  storageBucket: "animal-757f1.appspot.com",
  messagingSenderId: "958267432212",
  appId: "1:958267432212:web:8c41cd81be11bad66bf601"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
