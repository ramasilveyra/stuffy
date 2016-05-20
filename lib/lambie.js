import { Component, createElement } from 'react';
import { isObject } from 'lodash';
import R from 'ramda';

export default (stuffy, ...events) => {
  return (wrapped) => {
    class Lambie extends Component {
      componentDidMount() {
        if (!stuffy || !events) return;

        events.forEach((event) => {
          let eventName = event;
          let transform = () => (null);

          if (!isObject(event)) return;

          eventName = event.event;
          transform = event.transformer;

          if (!eventName) return;

          stuffy.subscribe(eventName, (state) => {
            this.setState(stuffy.transform(state, transform));
          });
        });
      }

      applyPropsTransformations() {
        if (!stuffy || !events) return;

        events.forEach((event) => {
          if (!isObject(event)) return;

          const { transformer, propName } = event;

          if (!transformer) return;
          if (!propName) return;

          const source = this.props[propName];

          if (source) {
            this.setState(stuffy.transform(source, transformer));
          }
        });
      }

      render() {
        this.applyPropsTransformations();

        const element = createElement(wrapped, { ...R.merge(this.state, this.props) });
        return element;
      }
    }

    return Lambie;
  };
};
