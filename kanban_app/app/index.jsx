import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral-react';
import App from './components/App.jsx';
import storage from './libs/storage';
import controller from './libs/controller';

import laneSignals from './signals/lane';
import noteSignals from './signals/note';

laneSignals(controller);
noteSignals(controller);

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Container controller={controller} app={App} />, app);
}
