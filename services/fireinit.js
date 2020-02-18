import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

let config = {
  apiKey: "xxxxx",
  authDomain: "xxxxx",
  databaseURL: "xxxx",
  projectId: "xxx9",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxx"
};


!firebase.apps.length ? firebase.initializeApp(config) : '';
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
export default firebase
