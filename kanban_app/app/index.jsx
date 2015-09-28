import 'array.prototype.find';
import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import {Container} from 'cerebral-react';
import App from './components/App.jsx';
import storage from './libs/storage';

import signals from './signals';

const APP_STORE = 'cerebral_app';

// XXX: it would be good to validate initial data now
// if it's invalid somehow, it's easy to end up with a broken app
const data = storage.get(APP_STORE) || {
  lanes: {},
  notes: {},
};
const model = Model({
  data: data,
  lanes: {
    ids: Object.keys(data.lanes),
    list: Model.monkey({
      cursors: {
        ids: ['lanes', 'ids'],
        lanes: ['data', 'lanes'],
        notes: ['data', 'notes'],
      },
      get(data) {
        return data.ids.map((laneId) => {
          const lane = data.lanes[laneId];
          return {
            id: lane.id,
            name: lane.name,
            notes: lane.notes.map((noteId) => data.notes[noteId])
          };
        });
      }
    })
  }
});

const controller = Controller(model);

controller.on('signalEnd', () => {
  storage.set(APP_STORE, controller.get('data'));
});

signals(controller);

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Container controller={controller} app={App} />, app);
}
