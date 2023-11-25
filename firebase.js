import firebase from 'firebase';

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

  const firebaseapp = firebase.initializeapp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider(); 

  export { db, storage, auth, provider };
  