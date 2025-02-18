import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAOa0gu0urhpOioDH1uMoPr5t1DwvBfXYI",
  authDomain: "dasboard-59cad.firebaseapp.com",
  databaseURL: "https://dasboard-59cad-default-rtdb.firebaseio.com",
  projectId: "dasboard-59cad",
  storageBucket: "dasboard-59cad.firebasestorage.app",
  messagingSenderId: "9489310017",
  appId: "1:9489310017:web:fa4cd711b5c8603b5401c0",
  measurementId: "G-9K6T7PG3JG",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

