// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBzkktTpHbsIQ5izM6K4E-9SH1KyL8iw00",
    authDomain: "shoppingapp-3434f.firebaseapp.com",
    projectId: "shoppingapp-3434f",
    storageBucket: "shoppingapp-3434f.firebasestorage.app",
    messagingSenderId: "711621504200",
    appId: "1:711621504200:web:3432798e30cd53088b49fd",
    measurementId: "G-R6974TWC74"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();