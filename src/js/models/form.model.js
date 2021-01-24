require('regenerator-runtime/runtime');
import {database} from '../firebase';

class FormModel {
  #score = {
    cremeLayer: 0, nose: 0, body: 0, afterTaste: 0
  };
  #closed = false;

  constructor(key, userKey, cuppingKey, coffeeKey, typeKey, scores) {
    this.key = key;
    this.userKey = userKey;
    this.cuppingKey = cuppingKey;
    this.coffeeKey = coffeeKey;
    this.typeKey = typeKey;
    if (scores) {
      Object.entries(scores).forEach(([key, value]) => this.setValue(key, value))
    }
  }

  get scores() {
    return this.#score;
  }

  setValue(key, value) {
    const exists = Object.keys(this.#score).includes(key);
    if (!exists || this.#closed) return false;
    this.#score[key] = value;
    return true;
  }


  close() {
    const allFilled = Object.values(this.#score).every(score => score > 0);
    if (allFilled) this.#closed = true;
    return allFilled;
  }

  async saveToDb() {
    this.close();
    const obj = {
      type: this.typeKey, user: this.userKey, scores: {
        ...this.scores
      }
    };
    if (this.key === 0) {
      const newDbObj = await database(`/cuppings/${this.cuppingKey}/forms/`).push(obj);
      this.key = newDbObj['key'];
    } else {
      await database(`/cuppings/${this.userKey}/forms/${this.key}`).set(obj);
    }
  }

}

export default FormModel;