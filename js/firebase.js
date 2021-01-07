import firebase from "firebase/app";
import config from './config';

require('firebase/auth');
require('firebase/database');



firebase.initializeApp(config.firebase);

exports.database = firebase.database();
exports.auth = firebase.auth()