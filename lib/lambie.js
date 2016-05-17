import { Component, createElement } from 'react';
import { isObject } from 'lodash';
import R from 'ramda';
import { renameKeys } from './ramda-ext';


export default (stuffy, ...events) => {
  const applyTransformation = (ctx, trans) => {
    if (!trans) {
      return ctx;
    }

    const { pick, extract, rename } = trans;
    let data = ctx;

    if (extract) {
      data = extract(ctx);
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

            stuffy.subscribe(eventName, (ctx) => {
              this.setState(applyTransformation(ctx, transform(R)));
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
