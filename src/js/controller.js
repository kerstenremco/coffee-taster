require('regenerator-runtime/runtime');
import LoadingView from './views/loading.view';
import LoginView from './views/login.view';
import UserModel from './models/user.model';
import Message from './message';
import CuppingsView from './views/cuppings.view';
import CuppingView from './views/cupping.view';
import CuppingModel from "./models/cupping.model";

class Controller {
	#cuppings = [];
	#currentCupping;
	#currentForm;

	constructor() {
		// Get HTML container
		this.htmlElement = document.getElementById('container');

		// Loading view
		this.loadingView = new LoadingView(this.htmlElement);

		// Message view
		this.message = new Message(this.htmlElement);

		// Login view
		this.loginView = new LoginView(this.htmlElement);
		this.loginView.loginSubmitEvent.addListener((username, password) => this.userModel.logIn(username, password));

		// Login model
		this.userModel = new UserModel();
		this.userModel.userLoggedInEvent.addListener(this.userLoggedInHandler.bind(this));
		this.userModel.userLoggedOutEvent.addListener(() => this.loginView.render());
		this.userModel.userLoggedInError.addListener(this.userLoggedInErrorHandler.bind(this));
	}

	run() {
		this.loadingView.render();
	}

	async userLoggedInHandler() {
		this.loadingView.render();
		this.#cuppings = await CuppingModel.fetch();
		// await this.cuppingsModel.fetch();
		this.cuppingsView = new CuppingsView(this.htmlElement, this.userModel.user.name, this.#cuppings);
		this.cuppingsView.render();
		this.cuppingsView.cuppingClickEvent.addListener(this.cuppingClickedHandler.bind(this));
	}

	userLoggedInErrorHandler(err) {
		console.error(err)
		this.loginView.render();
		this.message.show('danger', 'Fout tijdens inloggen');
	}

	cuppingClickedHandler(key) {
		this.#currentCupping = CuppingModel.getCuppingByKey(this.#cuppings, key);
		this.cuppingView = new CuppingView(this.htmlElement, this.#currentCupping, this.userModel.user.uid);
		this.cuppingView.backEvent.addListener(() => this.cuppingsView.render());
		this.cuppingView.saveEvent.addListener(this.saveFormHandler.bind(this));
		this.cuppingView.loadFormEvent.addListener((type) => this.loadFormHandler(type));
		this.cuppingView.changeScoreEvent.addListener((key, value) => this.#currentForm.setValue(key, value));
		this.cuppingView.render();
	}

	loadFormHandler(type) {
		this.#currentForm = this.#currentCupping.getFormByTypeAndOwner(type, this.userModel.user.uid);
		this.cuppingView.currentType = type;
		this.cuppingView.currentScores = this.#currentForm.scores;
	}

	async saveFormHandler() {
		try {
			await this.#currentForm.saveToDb();
			this.message.show('success', 'Scores opgeslagen')
		} catch(e) {
			console.error(e);
			this.message.show('danger', 'Fout tijdens opslaan')
		}
	}
}

export default Controller;