import { initializeApp } from "../firebase/app";
import { getFirestore } from "../firebase/firestore";

//unique firebase object
const firebaseConfig = {
    apiKey: "AIzaSyCDGvCeUX3po6mvddWprnM1HUDipEmHfyE",
    authDomain: "wnrmc-e91c3.firebaseapp.com",
    projectId: "wnrmc-e91c3",
    storageBucket: "wnrmc-e91c3.appspot.com",
    messagingSenderId: "832604211915",
    appId: "1:832604211915:web:fc2010abad9b65a3bee94e",
    measurementId: "G-6QVB8R39SN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//variable to access db collection
db.collections("users").doc().set({
    name: "hi wurld"})

