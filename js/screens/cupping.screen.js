import Screen from './screen.class';
import {setBubble} from '../range';

class cuppingScreen extends Screen {
	subjectTranslations = [['cremeLayer', 'Cremelaag'], ['nose', 'Geur'], ['body', 'Body'], ['afterTaste', 'Nasmaak']];
	constructor(cupping, currentUid) {
		super();
		this.cupping = cupping;
		this.currentUid = currentUid;
	}

	loadForm(type) {
		const htmlElement = document.getElementById("cupping-form-sliders");
		htmlElement.innerHTML = '';

		const form = this.cupping.getFormByTypeAndOwner(type, this.currentUid) || this.cupping.createNewForm(this.currentUid, type);

		Object.entries(form.scores).forEach(([key, value]) => {
		const subject = this.subjectTranslations.find(t => t[0] === key)[1] || key;
		const html = `
				<p class="subject">${subject}</p>
				<div class="range-wrap">
				<input type="range" class="range" data-key="${key}" min="1" max="10" value="${value || 1}">
				<output class="bubble"></output>
				</div>
		`;
		htmlElement.insertAdjacentHTML('beforeend', html);
	});

		document.querySelectorAll('.range-wrap').forEach((wrap) => {
		const range = wrap.querySelector('.range');
		const bubble = wrap.querySelector('.bubble');

		range.addEventListener('input', () => {
			setBubble(range, bubble);
			const key = range.dataset.key;
			form.setValue(key, range.value);
		});

		// setting bubble on DOM load
		setBubble(range, bubble);
	});


	}

	render() {
		this.html = `
			<div class="screen" id="screen-cupping-form">
        <ul id="select-type"></ul>
        <div id="cupping-form-sliders"></div>
        <button type="button" class="button-bottom" id="formSubmit">Opslaan</button>
    </div>
		`;

		super.render();

		const htmlTypesList = document.getElementById("select-type");
		Object.values(this.cupping.coffeeTypes).forEach(type => {
		htmlTypesList.insertAdjacentHTML('beforeend', `<li>${type}</li>`);
		htmlTypesList.querySelector("li:last-of-type").addEventListener('click', () => this.loadForm(type))
		});
	}
}

export default cuppingScreen;