import Cupping from './cupping.class';
import message from './message';
import elements from './htmlElements';
import Form from './form.class';
import {setBubble} from './range';

require('regenerator-runtime/runtime');
require('./range')

const state = {user: {}, cuppings: []};

const {auth, database} = require('./firebase');
auth.onAuthStateChanged(async(user) => {
	if(user) {
		// Show loading screen
		render(elements.fullLoadingScreen);

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
			state.cuppings.push(new Cupping(cupping.key, cupping.val().name, cupping.val().active, cupping.val().coffeeTypes, cupping.val().forms));
		});

		// Show cuppings list screen
		render(elements.fullCuppingScreen);

		// Set name in welcome text
		elements.welcomeName.innerText = state.user.name.substr(0, state.user.name.indexOf(' '));

		// Render cuppings in list
		renderCuppingsList();

	} else {
		// Clear state
		state.user = {};

		// Show login
		render(elements.fullLoginScreen);

		// Add event listener for form submit
		elements.loginSubmit.addEventListener('click', () => {
			// On login submit, call auth signin functio
			const email = elements.loginEmail.value;
			const password = elements.loginPassword.value;
			auth.signInWithEmailAndPassword(email, password)
				.catch(_err => message.show('Fout tijdens inloggen', 'danger'));
		});
	}
});

const render = function(screen) {
	// Remove current error message if exists
	message.remove();

	// Disable all screens
	elements.screens.forEach(screen => screen.classList.add('hide'));

	// Enable passed screen
	screen.classList.remove('hide');
};

const renderCuppingsList = function() {
	state.cuppings.forEach(cupping => cupping.renderOnList(elements.cuppingsList));

	// Set event listener for on list click
	elements.cuppingsList.addEventListener('click', function(e) {
		const id = e.target.closest('.cupping-list-item').dataset.cuppingid;
		if(id) renderCuppingForm(id);
	});
};

const renderCuppingForm = function(id) {
	// Pick cupping from state
	const cupping = state.cuppings.find(cupping => cupping.key === id);
	if(!cupping) return message.show('Fout tijdens laden cupping!', 'danger');
	state.cuppings.current = cupping;

	render(elements.cuppingForm);

	// Load types
	Object.values(state.cuppings.current.coffeeTypes).forEach(type => {
		const html = `<li>${type}</li>`;
		elements.selectTypeList.insertAdjacentHTML('beforeend', html);
	});

	// Add event listener
	elements.selectTypeList.addEventListener('click', function(e) {
		const type = e.target.closest('#select-type li').innerText;
		renderCuppingFormByType(type, id)
	});
};

const renderCuppingFormByType = function(type, id) {
	const subjectTranslations = [
		["cremeLayer", "Cremelaag"],
		["nose", "Geur"],
		["body", "Body"],
		["afterTaste", "Nasmaak"],
	]
	// Check if user has active form and select form
	const form = state.cuppings.current.forms.find(form => form?.owner === state.user.uid && form?.type === type) || new Form(2, state.user.uid, type)

	// For each subject, render slider
	elements.cuppingFormSliders.innerHTML = '';
	Object.entries(form.scores).forEach(([key, value]) => {
		const subject = subjectTranslations.find(t => t[0] === key)[1] || key;
		const html = `
				<p class="subject">${subject}</p>
				<div class="range-wrap">
				<input type="range" class="range" min="1" max="10" value="${value || 1}">
				<output class="bubble"></output>
				</div>
		`;
		elements.cuppingFormSliders.insertAdjacentHTML('beforeend', html);
	});
	document.querySelectorAll(".range-wrap").forEach((wrap) => {
		const range = wrap.querySelector(".range");
		const bubble = wrap.querySelector(".bubble");

		range.addEventListener("input", () => {
			setBubble(range, bubble);
		});

		// setting bubble on DOM load
		setBubble(range, bubble);
	});

	// Enable save button
	elements.formSubmit.classList.remove('hide');
	//TODO: Bij klik moet functie worden aangeroepen welke formulier opstaat. Nog uitzoeken hoe het met IDs in DB zit
};