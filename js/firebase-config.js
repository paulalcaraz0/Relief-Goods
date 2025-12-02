// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get them from: Firebase Console > Project Settings > Your apps > Web app

const firebaseConfig = {
  apiKey: "AIzaSyBkIpcbOofVQ0tgN4CQ8npF7MC2uQ_JGOk",
  authDomain: "kapitbayan-d75dc.firebaseapp.com",
  databaseURL: "https://kapitbayan-d75dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kapitbayan-d75dc",
  storageBucket: "kapitbayan-d75dc.firebasestorage.app",
  messagingSenderId: "793075689062",
  appId: "1:793075689062:web:fd46e0688c248c6c336fa7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get database reference
const database = firebase.database();
const locationsRef = database.ref('reliefRequests');

console.log('Firebase initialized successfully!');

