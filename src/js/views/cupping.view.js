import {setBubble} from '../range';
import Event from '../event';

class cuppingView {
	#subjectTranslations = [['cremeLayer', 'Cremelaag'], ['nose', 'Geur'], ['body', 'Body'], ['afterTaste', 'Nasmaak']];
	#currentForm;

	constructor(htmlElement, cupping, uid) {
		this.htmlElement = htmlElement;
		this.cupping = cupping;
		this.uid = uid;
		this.backEvent = new Event();
		this.loadFormEvent = new Event();
	}

	set currentForm(form) {
		this.#currentForm = form;
		if(form) this.render();
	}

	loadForm(type) {
		const htmlElement = document.getElementById('cupping-form-sliders');
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
		this.htmlElement.innerHTML = `
			<div class="screen" id="screen-cupping-form">
        <ul id="select-type"></ul>
        <div id="cupping-form-sliders"></div>
        <button type="button" class="button-bottom" id="formSubmit">Opslaan</button>
    </div>
		`;

		const backBtn = document.createElement('button');
		backBtn.innerText = 'terug';
		backBtn.addEventListener('click', () => this.backEvent.trigger());
		this.htmlElement.querySelector('#screen-cupping-form').appendChild(backBtn);

		const htmlTypesList = this.htmlElement.querySelector('#select-type');
		this.cupping.coffeeTypes.forEach(type => {
			if(!type) return;
			const html = document.createElement('li');
			html.innerText = type;
			html.addEventListener('click', () => this.loadFormEvent.trigger(type));
			htmlTypesList.appendChild(html);
		});

		//TODO formulier renderen
		if(this.#currentForm) console.log(this.#currentForm);
	}
}

export default cuppingView;