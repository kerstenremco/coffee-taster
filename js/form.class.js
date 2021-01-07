class Form {
	#score = {
		cremeLayer: 0, nose: 0, body: 0, afterTaste: 0
	};
	#closed = false;

	constructor(key, owner, type, scores) {
		this.key = key;
		this.owner = owner;
		this.type = type;
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

}

export default Form;