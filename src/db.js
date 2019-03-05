
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCPjBv91LpP_3Ml3MaegaWOEDapF7JXcuM",
  authDomain: "contador-yb-dev.firebaseapp.com",
  databaseURL: "https://contador-yb-dev.firebaseio.com",
  projectId: "contador-yb-dev",
  storageBucket: "contador-yb-dev.appspot.com",
  messagingSenderId: "671743433880"
};
/*var config = {
  apiKey: "AIzaSyBM_gzoDhM_1PzIJu9wkr8mVJjWdwuYwK8",
  authDomain: "contador-f1626.firebaseapp.com",
  databaseURL: "https://contador-f1626.firebaseio.com",
  projectId: "contador-f1626",
  storageBucket: "contador-f1626.appspot.com",
  messagingSenderId: "417151475130"
};*/

export const db = firebase.initializeApp(config).database();