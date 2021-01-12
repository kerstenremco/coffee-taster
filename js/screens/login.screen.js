import Screen from './screen.class';
import logo from '../../img/logo.png';
import {auth} from '../firebase';
import message from '../message';

class loginScreen extends Screen {
	constructor() {
		super();
	}

	render() {
		this.html = `
			<div class="screen flex" id="screen-login">
        <img src="${logo}" alt="Coffee taster logo" class="logo"/>
        <div class="login-form flex1">
            <label for="loginEmail">Emailadres</label>
            <input type="email" id="loginEmail" placeholder="name@example.com"/>
            <label for="loginPassword">Wachtwoord</label>
            <input type="password" id="loginPassword" placeholder="Password"/>
        </div>
        <button type="button" class="button-bottom" id="loginSubmit">Inloggen</button>
    	</div>
		`;

		super.render();

		document.getElementById('loginSubmit').addEventListener('click', () => {
			const email = document.getElementById("loginEmail").value;
			const password = document.getElementById("loginPassword").value;
			auth.signInWithEmailAndPassword(email, password)
				.catch(_err => message.show('Fout tijdens inloggen', 'danger'));
		});
	}
}

export default loginScreen;