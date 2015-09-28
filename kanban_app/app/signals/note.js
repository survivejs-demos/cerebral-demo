import uuid from 'node-uuid';

export default (controller) => {
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
}
