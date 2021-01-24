import {setBubble} from '../range';
import Event from '../event';

class cuppingView {
  #_subjectTranslations = [['cremeLayer', 'Cremalaag'], ['nose', 'Geur'], ['body', 'Body'], ['afterTaste', 'Nasmaak']];
  #_currentScores;
  #_currentType;
  cupping;

  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.backEvent = new Event();
    this.saveEvent = new Event();
    this.loadFormEvent = new Event();
    this.changeScoreEvent = new Event();
  }

  /**
   * Set (new) current opened form scores in this cupping
   * @param scores
   */
  set currentScores(scores) {
    this.#_currentScores = scores;
    if (scores) this.render();
  }


  set currentType(type) {
    this.#_currentType = type;
  }

  /**
   * Create HTML element for form-slider
   * @returns {HTMLDivElement}
   * @private
   */
  _renderHtmlFormElement() {
    const html = document.createElement('div');
    Object.entries(this.#_currentScores).forEach(([key, value]) => {
      const subject = this.#_subjectTranslations.find(t => t[0] === key)[1] || key;
      html.insertAdjacentHTML('beforeend', `
				<p class="subject">${subject}</p>
				<div class="range-wrap">
					<input type="range" class="range" data-key="${key}" min="1" max="10" value="${value || 1}">
					<output class="bubble"></output>
				</div>
		`);
    });

    html.querySelectorAll('.range-wrap').forEach((wrap) => {
      const range = wrap.querySelector('.range');
      const bubble = wrap.querySelector('.bubble');

      range.addEventListener('input', () => {
        setBubble(range, bubble);
        const key = range.dataset.key;
        this.changeScoreEvent.trigger(key, range.value);
      });

      // setting bubble on DOM load
      setBubble(range, bubble);
    });
    return html;
  }

  _saveFormHandler() {

    this.saveEvent.trigger()
  }

  render() {
    this.htmlElement.innerHTML = `
			<div class="screen" id="screen-cupping-form">
        <ul id="select-type"></ul>
        <div id="cupping-form-sliders"></div>
    </div>
		`;

    const backBtn = document.createElement('div');
    backBtn.innerText = '< overzicht koffies';
    backBtn.addEventListener('click', () => this.backEvent.trigger());
    this.htmlElement.querySelector('#screen-cupping-form').prepend(backBtn);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'button-bottom';
    saveBtn.id = 'formSubmit';
    saveBtn.innerText = 'Opslaan';
    saveBtn.addEventListener('click', this._saveFormHandler.bind(this));
    this.htmlElement.querySelector('#screen-cupping-form').append(saveBtn);

    const htmlTypesList = this.htmlElement.querySelector('#select-type');
    this.cupping.coffeeTypes.forEach(type => {
      if (!type) return;
      const html = document.createElement('li');
      html.innerText = type;
      html.dataset.type = type;
      html.addEventListener('click', () => this.loadFormEvent.trigger(type));
      htmlTypesList.appendChild(html);
    });
    if (this.#_currentScores) {
      htmlTypesList.querySelector(`[data-type=${this.#_currentType}]`).classList.add('active');
      this.htmlElement.appendChild(this._renderHtmlFormElement())
    }
  }
}

export default cuppingView;