import Cupping from './objects/cupping.class';
import LoadingScreen from './screens/loading.screen';
import LoginScreen from './screens/login.screen';
import CuppingListScreen from './screens/cuppingList.screen';
import CuppingScreen from './screens/cupping.screen';

require('regenerator-runtime/runtime');
require('./range');

document.getElementById('js-warning').remove();


const handleCuppingListClick = function(id) {
	const cuppingScreen = new CuppingScreen(state.cuppings[0], state.user.uid);
	cuppingScreen.render();
};

const state = {user: {}, cuppings: []};

const {auth, database} = require('./firebase');
auth.onAuthStateChanged(async(user) => {
	if(user) {
		// Show loading screen
		const loadingScreen = new LoadingScreen();
		loadingScreen.render();

		// Get user profile from DB
		const userSnapshot = await database.ref(`/users/${user.uid}`).once('value');

		// Save user details in state
		state.user.uid = user.uid;
		state.user.email = user.email;
		state.user.name = userSnapshot.val().name;

		// Get cuppings from DB
		const cuppingsSnapshot = await database.ref(`/cuppings`).once('value');


		// Put cuppings in state
		cuppingsSnapshot.forEach(cupping => {
			state.cuppings.push(Cupping.constructFromDatabaseEntry(cupping));
		});

		// Show cuppings list screen
		const firstName = state.user.name.substr(0, state.user.name.indexOf(' '));
		const cuppingListScreen = new CuppingListScreen(firstName, state.cuppings, handleCuppingListClick);
		cuppingListScreen.render();

	} else {
		// Clear state
		state.user = {};

		// Show login
		const loginScreen = new LoginScreen();
		loginScreen.render();
	}
});