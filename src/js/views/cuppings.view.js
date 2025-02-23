import Event from '../event';

class CuppingsView {
  firstName;
  cuppings;

  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.cuppingClickEvent = new Event();
  }

  _renderCuppingHtmlElement(key, name) {
    const html = document.createElement('div');
    html.className = 'list-item';
    html.innerHTML = `
    	<p>${name}</p>
      <p>></p>
    `;
    html.addEventListener('click', () => this.cuppingClickEvent.trigger(key));
    return html;
  }

  render() {
    this.htmlElement.innerHTML = `
			<div class="screen flex" id="screen-cupping">
        <h1 class="cupping-welcome">
            <span class="name">${this.firstName}</span>, het is een <span>altijd</span> een goed moment voor <span>koffie!</span>
        </h1>
        <div class="flex1" id="cuppings-list">
				</div>
    </div>
		`;
    const list = this.htmlElement.querySelector('#cuppings-list');
    this.cuppings.forEach(c => list.appendChild(this._renderCuppingHtmlElement(c.key, c.name)));
  }
}

export default CuppingsView;