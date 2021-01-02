// src/firebase-config.js

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAS4a_gTq49PpRPI-ZgY1ztlQsXYUnGdqU",
    authDomain: "personal-diary-31fd9.firebaseapp.com",
    databaseURL: "https://personal-diary-31fd9-default-rtdb.firebaseio.com",
    projectId: "personal-diary-31fd9",
    storageBucket: "personal-diary-31fd9.appspot.com",
    messagingSenderId: "714221489818",
    appId: "1:714221489818:web:033637ba39059486cc5923",
    measurementId: "G-V0CKN69X90"
});

const db = firebaseApp.firestore();
export default db;