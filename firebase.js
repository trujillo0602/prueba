import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBWfJHTOUx2BSJXhvanbatG6l97nXI4ZZI",
  authDomain: "usuarios-e6ce0.firebaseapp.com",
  projectId: "usuarios-e6ce0",
  storageBucket: "usuarios-e6ce0.appspot.com",
  messagingSenderId: "155426030840",
  appId: "1:155426030840:web:3523ea9ef728eb0b10a70d",
  measurementId: "G-WTHVPSRWZT"
};

 firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  export {
    firebase,
    db
  };