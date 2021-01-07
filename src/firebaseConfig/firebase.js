import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVZ-0wJIv_qyT7slfqRSZWspvpHtK8cNk",
  authDomain: "socialapp-db.firebaseapp.com",
  projectId: "socialapp-db",
  storageBucket: "socialapp-db.appspot.com",
  messagingSenderId: "778050378984",
  appId: "1:778050378984:web:650e9bacb8eb55049d3d5d"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
