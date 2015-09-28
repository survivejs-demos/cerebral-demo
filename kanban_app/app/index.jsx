import 'array.prototype.findindex';
import './main.css';

import uuid from 'node-uuid';
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

// lanes
controller.signal('laneCreated', (lane, state) => {
  lane.id = uuid.v4();
  lane.notes = lane.notes || [];

  state.push('lanes', lane);
});
controller.signal('laneUpdated', ({id, name}, state) => {
  state.set(['lanes', {id}, 'name'], name);
});
controller.signal('laneDeleted', (id, state) => {
  state.unset(['lanes', {id}]);

  // it would be a good idea to seek and destroy possible
  // associated notes. now they remain hanging in the memory
});

// notes
controller.signal('noteCreated', ({laneId, note}, state) => {
  note.id = uuid.v4();

  state.push('notes', note);

  // it would be a good idea to check that the lane exists
  // before doing this
  state.push(['lanes', {id: laneId}, 'notes'], note.id);
});
controller.signal('noteUpdated', ({id, task}, state) => {
  state.set(['notes', {id}, 'task'], task);
});
controller.signal('noteDeleted', ({laneId, noteId}, state) => {
  state.unset(['lanes', {id: laneId}, 'notes', noteId]);
  state.unset(['notes', {id: noteId}]);
});
controller.signal('noteMoved', ({sourceId, targetId}, state) => {
  console.log('note moved', sourceId, targetId, state);
});

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Container controller={controller} app={App} />, app);
}
