import * as Rx  from 'rx';

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
}
