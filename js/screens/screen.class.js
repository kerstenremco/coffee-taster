class Screen {
	html;
	constructor() {
		this.htmlElement = document.getElementById("container");
	}
	render() {
		this.htmlElement.innerHTML = '';
		this.htmlElement.insertAdjacentHTML('afterbegin', this.html);
	}
}

export default Screen;