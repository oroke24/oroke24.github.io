import firebase from 'firebase/app';
import 'firebase/firestore';

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
//Initialize db
firebase.initializeApp(firebaseConfig);
var firebase = firebase.firestore();

//variable to access db collection
const db = firestore.collection("users");
db.doc().set({
    name: "hi wurld"})

//Get submit form
let submit = document.getElementById("submit");
//create Event Listener to allow form submission
submit.addEventListener("click", (e) => {
    alert("helloworld");
    //prevent default behavior
    e.preventDefault();
});
