import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  
    apiKey: "AIzaSyAmQVUJ7rSC63WnzM0gVgXK8s74JxtDb3c",
    authDomain: "likeme-2b112.firebaseapp.com",
    databaseURL: "https://likeme-2b112-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "likeme-2b112",
    storageBucket: "likeme-2b112.appspot.com",
    messagingSenderId: "848882013918",
    appId: "1:848882013918:web:90f6aed4a3b49ee13b144f",
    measurementId: "G-JVL63HH14F"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebaseApp.firestore()
const storage = getStorage()

export { auth, db, storage, firebaseApp }
