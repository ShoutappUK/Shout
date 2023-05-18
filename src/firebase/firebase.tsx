// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBpl9j5CsMQ30wP0veQQ4wS3ztLYuGyE6k',
  authDomain: 'open-data-cw.firebaseapp.com',
  databaseURL: 'https://open-data-cw-default-rtdb.firebaseio.com',
  projectId: 'open-data-cw',
  storageBucket: 'open-data-cw.appspot.com',
  messagingSenderId: '690049215065',
  appId: '1:690049215065:web:c6dad14a646fbb27bb9f48'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export default db
