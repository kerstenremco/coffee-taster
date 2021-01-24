import {database} from '../firebase';
import Form from './form.model';
import FormModel from './form.model';

require('regenerator-runtime/runtime');

class CuppingModel {
  #forms = [];

  constructor(key, name, active, coffees, coffeeTypes) {
    this.key = key;
    this.name = name;
    this.active = active;
    this.coffees = coffees;
    this.coffeeTypes = coffeeTypes;
  }

  static async fetch() {
    const result = [];
    const snapshot = await database('/cuppings').once('value');
    snapshot.forEach(cuppingSnapshot => {
      const value = cuppingSnapshot.val();
      if (!value) return;
      const c = new CuppingModel(cuppingSnapshot.key, value.name, value.active, value.coffees, value.coffeeTypes);
      if (value.forms) {
        Object.entries(value.forms).forEach(([key, value]) => {
          const f = new FormModel(key, value.user, cuppingSnapshot.key, value.coffees, value.type, value.scores);
          c.addForm(f);
        });
      }
      result.push(c);
    });
    return result;
  }

  static getCuppingByKey(cuppingsArray, key) {
    return cuppingsArray.find(c => c.key === key);
  }

  addForm(formObject) {
    this.#forms.push(formObject);
  }

  getFormByTypeAndOwner(coffee, type, user) {
    console.log(this.#forms)
    let form = this.#forms.find(form => form.userKey === user && form.coffeeKey === coffee && form.typeKey === type);
    if (!form) {
      form = new Form(0, user, this.key, coffee, type);
      this.addForm(form);
    }
    return form;
  }
}

export default CuppingModel;