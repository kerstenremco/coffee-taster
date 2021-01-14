import Form from './form.model';

class CuppingModel {
	#forms = [];

	constructor(key, name, active, coffeeTypes) {
		this.key = key;
		this.name = name;
		this.active = active;
		this.coffeeTypes = coffeeTypes;
	}

	addForm(formObject) {
		this.#forms.push(formObject);
	}

	getFormByTypeAndOwner(type, owner) {
		return this.#forms.find(form => form.owner === owner && form.type === type);
	}

	createNewForm(user, type) {
		const form = new Form(this.key, 0, user, type);
		this.forms = form;
		return form;
	}

	renderOnList(listElement, handleCuppingListClick) {
		if(!this.active) return;
		const html = `
      <div class="cupping-list-item" data-cuppingid="${this.key}">
        <p>${this.name}</p>
        <p>></p>
      </div>
      <hr />
    `;
		listElement.insertAdjacentHTML('beforeend', html);
		const insertedElement = listElement.querySelector('div:last-of-type');
		insertedElement.addEventListener('click', () => handleCuppingListClick(this.key));

	}
}

export default CuppingModel;