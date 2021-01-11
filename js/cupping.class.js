import {database} from './firebase'
import Form from './form.class';

class Cupping {
  #forms = [];

  constructor(key, name, active, coffeeTypes) {
    this.key = key;
    this.name = name;
    this.active = active;
    this.coffeeTypes = coffeeTypes;
  }

  static constructFromDatabaseEntry(dbObject) {
    const key = dbObject.key;
    const cupping = dbObject.val();
    const newCupping = new Cupping(key, cupping.name, cupping.active, cupping.coffeeTypes, cupping.forms);
    if(cupping.forms) {
      Object.entries(cupping.forms).forEach(([key, form]) => {
        newCupping.forms = Form.constructFromDatabaseEntry(newCupping.key, key, form)
      })
    }
    return newCupping;
  }

  set forms(formObject) {
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

  renderOnList(listElement) {
    if (!this.active) return;
    const html = `
          <div class="cupping-list-item" data-cuppingid="${this.key}">
              <p>${this.name}</p>
              <p>></p>
          </div>
          <hr />
        `;
    listElement.insertAdjacentHTML('beforeend', html);
  }
}

export default Cupping;