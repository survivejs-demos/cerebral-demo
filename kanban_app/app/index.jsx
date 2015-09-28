import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import {Container} from 'cerebral-react';
import App from './components/App.jsx';
import storage from './libs/storage';

import laneSignals from './signals/lane';
import noteSignals from './signals/note';

// TODO: load initial data from localStorage
// it would be good to validate initial data now
// if it's broken somehow, it's easy to end up with a broken app
const model = Model({
  lanes: [],
  notes: []
});
model.tree.on('update', (e) => {
  // TODO: write the new state to localStorage
  console.log('tree updated', e);
});

const controller = Controller(model);

laneSignals(controller);
noteSignals(controller);

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Container controller={controller} app={App} />, app);
}
