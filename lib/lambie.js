import { Component, createElement } from 'react';

export default (stuffy, event) => {
  return (wrapped) => {
    class Lambie extends Component {
      componentWillMount() {
        if (stuffy) {
          stuffy.subscribe(event, (data) => {
            this.setState(data);
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
