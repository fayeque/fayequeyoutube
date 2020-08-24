import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDIxWgCyxd84Doq3ClRP51gj-tJa5QuAU4",
    authDomain: "clone-e1d37.firebaseapp.com",
    databaseURL: "https://clone-e1d37.firebaseio.com",
    projectId: "clone-e1d37",
    storageBucket: "clone-e1d37.appspot.com",
    messagingSenderId: "821291287731",
    appId: "1:821291287731:web:66be9d02e1d93c11f81cc6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };