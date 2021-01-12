import Screen from './screen.class';
import logo from '../../img/logo.png';

class loadingScreen extends Screen {
	constructor() {
		super();
	}

	render() {
		this.html = `
			<div class="screen flex" id="screen-loading">
        <img src="${logo}" alt="Coffee taster logo" class="logo"/>
        <div class="loader">Loading...</div>
    	</div>
		`;

		super.render();
	}
}

export default loadingScreen;