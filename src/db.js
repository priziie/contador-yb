
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCPjBv91LpP_3Ml3MaegaWOEDapF7JXcuM",
  authDomain: "contador-yb-dev.firebaseapp.com",
  databaseURL: "https://contador-yb-dev.firebaseio.com",
  projectId: "contador-yb-dev",
  storageBucket: "contador-yb-dev.appspot.com",
  messagingSenderId: "671743433880"
};

export const db = firebase.initializeApp(config).database();