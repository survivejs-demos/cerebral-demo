import uuid from 'node-uuid';
import Controller from 'cerebral';
import Model from 'cerebral-baobab';

// TODO: load the initial state of the app from localStorage here
const model = Model({
  lanes: [],
  notes: []
});

model.tree.on('update', (e) => {
  // TODO: write the new state to localStorage
  console.log('tree updated', e);
});

const controller = Controller(model);

// lanes
controller.signal('laneCreated', (lane) => {
  lane.id = uuid.v4();
  lane.notes = lane.notes || [];

  model.tree.select('lanes').push(lane);
});
controller.signal('laneUpdated', ({id, name}) => {
  model.tree.select('lanes', {id}).set('name', name);
});
controller.signal('laneDeleted', (id) => {
  model.tree.select('lanes', {id}).unset();

  // it would be a good idea to seek and destroy possible
  // associated notes. now they remain hanging in the memory
});

// notes
controller.signal('noteCreated', ({laneId, note}) => {
  note.id = uuid.v4();

  model.tree.select('notes').push(note);
  const laneNotes = model.tree.select('lanes', {
    id: laneId
  }, 'notes');

  // it would be a good idea to check that the lane exists
  // before doing this
  laneNotes.push(note.id);
});
controller.signal('noteUpdated', ({id, task}) => {
  model.tree.select('notes', {id}).set('task', task);
});
controller.signal('noteDeleted', ({laneId, noteId}) => {
  model.tree.select('lanes', {id: laneId}, 'notes', noteId).unset();
  model.tree.select('notes', {id: noteId}).unset();
});
controller.signal('noteMoved', ({sourceId, targetId}) => {
  console.log('note moved', sourceId, targetId);
});

export default controller;
