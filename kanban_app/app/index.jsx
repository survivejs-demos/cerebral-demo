import React from 'react';
import ReactDOM from 'react-dom';
import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import {Container} from 'cerebral-view-react';
import Recorder from 'cerebral-module-recorder';
import App from './components/App.jsx';
import Kanban from './modules/Kanban';
import storage from './libs/storage';

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
            editing: lane.editing,
            name: lane.name,
            notes: lane.notes.map((noteId) => data.notes[noteId])
          };
        });
      }
    })
  }
});

const controller = Controller(model);

controller.addModules({
  kanban: Kanban(),
  recorder: Recorder()
});

controller.on('signalEnd', () => {
  storage.set(APP_STORE, controller.get('data'));
});

ReactDOM.render(
  <Container controller={controller} app={App} />, document.getElementById('app')
);
