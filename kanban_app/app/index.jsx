import React from 'react';
import ReactDOM from 'react-dom';
import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import {Container} from 'cerebral-view-react';
import Recorder from 'cerebral-module-recorder';
import App from './components/App.jsx';
import Kanban from './modules/Kanban';
import storage from './storage';

const controller = Controller(Model({}));

controller.addModules({
  kanban: Kanban(),
  recorder: Recorder(),
  devtools: process.env.NODE_ENV !== 'production' ? require('cerebral-module-devtools')() : function () {}
});

controller.on('change', () => {
  storage.set('cerebral_app', controller.get('kanban.data'));
});

ReactDOM.render(
  <Container controller={controller} app={App} />, document.getElementById('app')
);
