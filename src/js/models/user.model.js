import {auth, database, databaseRef} from '../firebase';
import Event from '../event';

class UserModel {
	#user;

	constructor() {
		this.userLoggedInEvent = new Event();
		this.userLoggedOutEvent = new Event();
		this.userLoggedInError = new Event();
		auth.onAuthStateChanged(user => {
			if(user) {
				database.ref(databaseRef(`/users/${user.uid}`)).once('value')
					.then(snapshot => {
						if(!snapshot.exists()) throw new Error('Gebruiker bestaan niet in database')
						this.#user = {
							uid: user.uid, email: user.email, name: snapshot.val().name
						};
						this.userLoggedInEvent.trigger(user);
					})
					.catch((err) => this.userLoggedInError.trigger(err));
			} else {
				this.userLoggedOutEvent.trigger();
			}
		});
	}

	logIn(username, password) {
		if(!username || !password) return this.userLoggedInError.trigger('Geef gebruikersnaam en wachtwoord op!');
		auth.signInWithEmailAndPassword(username, password).catch((err) => this.userLoggedInError.trigger(err));
	}

	get user() {
		return this.#user;
	}
}

export default UserModel;