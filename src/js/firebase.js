import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/database');


firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});

function database(ref) {
  let reference = ref;
  if (process.env.FIREBASE_DATABASE_SUB) {
    reference = process.env.FIREBASE_DATABASE_SUB + reference;
  }
  return firebase.database().ref(reference);
}

exports.database = database;
exports.auth = firebase.auth();