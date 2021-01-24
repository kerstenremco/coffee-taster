import Event from '../event';

class CoffeesView {
  coffees;

  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.coffeeClickEvent = new Event();
    this.backEvent = new Event();
  }

  _renderCoffeeHtmlElement(key, name) {
    const html = document.createElement('div');
    html.className = 'list-item';
    html.innerHTML = `
    	<p>${name}</p>
      <p>></p>
    `;
    html.addEventListener('click', () => this.coffeeClickEvent.trigger(key));
    return html;
  }

  render() {
    this.htmlElement.innerHTML = `
			<div class="screen flex" id="screen-coffees">
        <div class="flex1" id="coffees-list">
				</div>
    </div>
		`;

    const backBtn = document.createElement('div');
    backBtn.innerText = '< overzicht cuppings';
    backBtn.addEventListener('click', () => this.backEvent.trigger());
    this.htmlElement.querySelector('#screen-coffees').prepend(backBtn);

    const list = this.htmlElement.querySelector('#coffees-list');
    Object.entries(this.coffees).forEach(([key, name]) => list.appendChild(this._renderCoffeeHtmlElement(key, name)));
  }
}

export default CoffeesView;