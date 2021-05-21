import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCRwVxbM8TH8ONrCo3-0osjmO8mTF_94O4",
  authDomain: "famgram-e603c.firebaseapp.com",
  projectId: "famgram-e603c",
  storageBucket: "famgram-e603c.appspot.com",
  messagingSenderId: "669791307222",
  appId: "1:669791307222:web:e37b17816aed7d98c55077"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
