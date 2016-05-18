import * as Rx  from 'rx';
import lambie from './lambie';
import tranformation from './transformation';

export default class Stuffy {
  constructor() {
    this.state = {};
  }

  register(eventName) {
    this.state[eventName] = new Rx.Subject();
  }

  registerFromObject(obj) {
    Object.keys(obj).forEach((key) => {
      this.state[obj[key]] = new Rx.Subject();
    });
  }

  subscribe(eventName, func) {
    this.state[eventName]
      .subscribe(
        func,
        error => { console.log(error); }
      );
  }

  broadcast(eventName, data) {
    this.state[eventName].onNext(data);
  }

  transform(state, transformer) {
    return tranformation(state, transformer);
  }

  compose(component, ...events) {
    return lambie(this, ...events)(component);
  }
}
