require('regenerator-runtime/runtime');
import {database} from '../firebase';

class FormModel {
	#score = {
		cremeLayer: 0, nose: 0, body: 0, afterTaste: 0
	};
	#closed = false;

	constructor(belongsTo, key, owner, type) {
		this.belongsTo = belongsTo;
		this.key = key;
		this.owner = owner;
		this.type = type;
	}

	static constructFromDatabaseEntry(cuppingKey, key, form) {
		const newForm = new Form(cuppingKey, key, form.user, form.type);
		if(form.scores) Object.entries(form.scores).forEach(([key, value]) => newForm.setValue(key, value));
		return newForm;
	}

	get scores() {
		return this.#score;
	}

	setValue(key, value) {
		const exists = Object.keys(this.#score).includes(key);
		if(!exists || this.#closed) return false;
		this.#score[key] = value;
		return true;
	}


	close() {
		const allFilled = Object.values(this.#score).every(score => score > 0);
		if(allFilled) this.#closed = true;
		return allFilled;
	}

	async saveToDb() {
		const obj = {
			type: this.type, user: this.owner, scores: {
				...this.scores
			}
		};
		if(this.key === 0) {
			const newDbObj = await database.ref(`/cuppings/${this.belongsTo}/forms/`).push(obj);
			this.key = newDbObj.key;
		} else {
			await database.ref(`/cuppings/${this.belongsTo}/forms/${this.key}`).set(obj);

		}
	}

}

export default FormModel;