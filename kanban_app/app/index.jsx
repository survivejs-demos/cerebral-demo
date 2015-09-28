import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral-react';
import App from './components/App.jsx';
import storage from './libs/storage';
import controller from './libs/controller';

/*
  CHRISTIAN:
  This is where you put your signals and import your actions. Actions
  are named as "what they do"

  import createLane from './actions/createLane.js';

  controller.signal('laneCreated', createLane);

  And this is how a typical action would look:

  function createLane (input, state, output) {

    state.push('lanes', {
      id: uuid.v4(),
      notes: input.lane.notes || []
    });

  }
*/

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Container controller={controller} app={App} />, app);
}
