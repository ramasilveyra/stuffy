import { Component, createElement } from 'react';
import { isObject } from 'lodash';

export default (stuffy, ...events) => {
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
              this.setState(stuffy.transform(state, transform));
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
