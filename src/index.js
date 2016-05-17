import ReactDom from 'react-dom';
import React from 'react';
import { Stuffy } from '../lib';
import RedBox from 'redbox-react';

module.exports.create = function create($element) {
  const stuffy = new Stuffy();

  function hotReload() {
    try {
      render();
    } catch (error) {
      renderError(error);
    }
  }

  function render() {
    const createApp = require('./App').default;
    const App = createApp(React, stuffy);
    ReactDom.render(<App />, $element);
  }

  function renderError(error) {
    ReactDom.render(<RedBox error={error} />, $element);
  }

  function setupHotModuleReload() {
    return module.hot && module.hot.accept('./App', () => setTimeout(hotReload));
  }

  setupHotModuleReload();

  return hotReload();
};
