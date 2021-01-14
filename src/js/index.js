// import Cupping from './models/cupping.class';
// import LoadingScreen from './views/loading.screen';
// import LoginScreen from './views/login.screen';
// import CuppingListScreen from './views/cuppingList.screen';
// import CuppingScreen from './views/cupping.screen';
//
// require('regenerator-runtime/runtime');
// require('./range');

import Controller from './controller';

const controller = new Controller();
controller.run();

// document.getElementById('js-warning').remove();
//
//
// const handleCuppingListClick = function(id) {
// 	const cuppingView = new CuppingScreen(state.cuppings[0], state.user.uid);
// 	cuppingView.render();
// };
//
// const state = {user: {}, cuppings: []};
//
// const {auth, database} = require('./firebase');
// auth.onAuthStateChanged(async(user) => {
// 	if(user) {
// 		// Show loading screen
// 		const loadingView = new LoadingScreen();
// 		loadingView.render();
//
// 		// Get user profile from DB
// 		const userSnapshot = await database.ref(`/users/${user.uid}`).once('value');
//
// 		// Save user details in state
// 		state.user.uid = user.uid;
// 		state.user.email = user.email;
// 		state.user.name = userSnapshot.val().name;
//
// 		// Get cuppings from DB
// 		const cuppingsSnapshot = await database.ref(`/cuppings`).once('value');
//
//
// 		// Put cuppings in state
// 		cuppingsSnapshot.forEach(cupping => {
// 			state.cuppings.push(Cupping.constructFromDatabaseEntry(cupping));
// 		});
//
// 		// Show cuppings list screen
// 		const firstName = state.user.name.substr(0, state.user.name.indexOf(' '));
// 		const cuppingListScreen = new CuppingListScreen(firstName, state.cuppings, handleCuppingListClick);
// 		cuppingListScreen.render();
//
// 	} else {
// 		// Clear state
// 		state.user = {};
//
// 		// Show login
// 		const loginView = new LoginScreen();
// 		loginView.render();
// 	}
// });

// Check user logged in

// If logged in, show cupping view

// If not logged in, show login view