import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_X7aTZMOcb0RN8iZ6GL78yt5231s6fGo",
  authDomain: "socialapp-db2.firebaseapp.com",
  databaseURL: "https://socialapp-db2-default-rtdb.firebaseio.com",
  projectId: "socialapp-db2",
  storageBucket: "socialapp-db2.appspot.com",
  messagingSenderId: "593273146714",
  appId: "1:593273146714:web:ffb5d1f69dcb0acdfdb763"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
