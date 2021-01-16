import CuppingModel from './cupping.model';
import {database} from '../firebase';
import FormModel from './form.model';

require('regenerator-runtime/runtime');

class CuppingsModel {
	#cuppings = [];

	async fetch() {
		const snapshot = await database.ref(`/cuppings`).once('value');
		snapshot.forEach(cuppingSnapshot => {
			const value = cuppingSnapshot.val();
			if(!value) return;
			const c = new CuppingModel(cuppingSnapshot.key, value.name, value.active, value.coffeeTypes);
			if(value.forms) {
				Object.entries(value.forms).forEach(([key, value]) => {
					const f = new FormModel(cuppingSnapshot.key, key, value.user, value.type, value.scores);
					c.addForm(f);
				});
			}
			this.#cuppings.push(c);
		});
	}

	get cuppings() {
		return this.#cuppings;
	}

	getCuppingByKey(key) {
		return this.#cuppings.find(c => c.key === key);
	}
}

export default CuppingsModel;