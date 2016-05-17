import { Component, createElement } from 'react';
import { isObject, isArray, map } from 'lodash';
import R from 'ramda';
import { renameKeys } from './ramda-ext';


export default (stuffy, ...events) => {
  const resolveTransformation = (state, trans) => {
    const { pick, extract, rename } = trans;
    let data = state;

    if (extract) {
      data = extract(state);
    }

    if (pick) {
      data = R.pick(pick, data);
    }

    if (rename) {
      data = renameKeys(rename)(data);
    }

    delete trans.pick;
    delete trans.extract;
    delete trans.rename;

    return R.evolve(trans, data);
  };

  const applyTransformation = (state, trans) => {
    if (!trans) {
      return state;
    }

    let { wrapWith, extract } = trans;

    delete trans.wrapWith;

    if (isArray(state) && !extract) {
      wrapWith = wrapWith || 'values';

      const result = {};
      const values = map(state, (val) => (resolveTransformation(val, trans)));

      result[wrapWith] = values;

      return result;
    }

    return resolveTransformation(state, trans);
  };

  return (wrapped) => {
    class Lambie extends Component {
      componentWillMount() {
        if (stuffy && events) {
          events.forEach((event) => {
            let eventName = event;
            let transform = () => (null);

            if (isObject(event)) {
              eventName = event.event;
              transform = event.transformer;
            }

            stuffy.subscribe(eventName, (state) => {
              this.setState(applyTransformation(state, transform(R)));
            });
          });
        }
      }

      render() {
        const element = createElement(wrapped, { ...this.state });
        return element;
      }
    }

    return Lambie;
  };
};
