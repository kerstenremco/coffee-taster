import Logo from '../../img/logo.png';
import Event from '../event';

class LoginView {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.loginSubmitEvent = new Event();
  }

  render() {
    this.htmlElement.innerHTML = `
			<div class="screen flex" id="screen-login">
        <img src="${Logo}" alt="Coffee taster logo" class="logo"/>
        <div class="login-form flex1">
            <label for="loginEmail">E-mailadres</label>
            <input type="email" id="loginEmail" placeholder="name@example.com"/>
            <label for="loginPassword">Wachtwoord</label>
            <input type="password" id="loginPassword" placeholder="Password"/>
        </div>
        <button type="button" class="button-bottom" id="loginSubmit">Inloggen</button>
    	</div>
		`;
    this.htmlElement.querySelector('#loginSubmit')
      .addEventListener('click', () => {
        const username = this.htmlElement.querySelector('#loginEmail').value;
        const password = this.htmlElement.querySelector('#loginPassword').value;
        this.loginSubmitEvent.trigger(username, password);
      });
  }
}

export default LoginView;