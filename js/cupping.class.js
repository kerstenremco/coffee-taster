import Form from './form.class';

class Cupping {
  constructor(key, name, active, coffeeTypes, forms) {
    this.key = key;
    this.name = name;
    this.active = active;
    this.coffeeTypes = coffeeTypes;
    this.forms = [];
    if(forms) forms.forEach(form => {
      const newForm = new Form(0, form.user, form.type, form.scores);
      if(form.scores) Object.entries(form.scores).forEach(([key, value]) => newForm.setValue(key, value))
      this.forms.push(newForm);
    })

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