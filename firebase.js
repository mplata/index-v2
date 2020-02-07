import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

let config = {
    apiKey: "AIzaSyCnkN-Zrub3h84CDdw774rd03DXbvyaqMc",
    authDomain: "indexapp-6d191.firebaseapp.com",
    databaseURL: "https://indexapp-6d191.firebaseio.com",
    projectId: "indexapp-6d191",
    storageBucket: "indexapp-6d191.appspot.com",
    messagingSenderId: "121394248384"
};
let firebaseApp = firebase.initializeApp(config);

export default firebaseApp;