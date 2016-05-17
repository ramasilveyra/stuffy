import createApp from './App';
import ReactDom from 'react-dom';
import React from 'react';
import { Stuffy } from '../lib';

module.exports.create = function create($element) {
  const stuffy = new Stuffy();
  const App = createApp(React, stuffy);

  return ReactDom.render(
    React.createElement(App),
    $element
  );
};
