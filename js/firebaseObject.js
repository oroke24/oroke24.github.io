//FIREBASE INITIALIZATION///////
// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDGvCeUX3po6mvddWprnM1HUDipEmHfyE",
    authDomain: "wnrmc-e91c3.firebaseapp.com",
    projectId: "wnrmc-e91c3",
    storageBucket: "wnrmc-e91c3.appspot.com",
    messagingSenderId: "832604211915",
    appId: "1:832604211915:web:fc2010abad9b65a3bee94e",
    measurementId: "G-6QVB8R39SN"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
