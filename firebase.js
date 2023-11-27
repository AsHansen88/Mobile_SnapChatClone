import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTVhUc3zC_D_91SgNku2cqCWLrr-xrv18",
    authDomain: "snapchatclone-ffcb9.firebaseapp.com",
    projectId: "snapchatclone-ffcb9",
    storageBucket: "snapchatclone-ffcb9.appspot.com",
    messagingSenderId: "47323077322",
    appId: "1:47323077322:web:e912adf6ee04599bb03233",
    measurementId: "G-1THTXV5V4N"
  };
/*
  if(firebase.apps.length ===0)  {
    firebase.initializeApp(firebaseConfig)
  }
*/
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const CreateUser = createUserWithEmailAndPassword(app);
const SignIn = signInWithEmailAndPassword(app)

export { app, auth, firestore, storage, CreateUser, SignIn };