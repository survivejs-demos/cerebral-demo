import uuid from 'node-uuid';

export default (controller) => {
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

    // XXX: it would be a good idea to seek and destroy possible
    // associated notes. now they remain hanging in the memory
  });
  controller.signal('attachNoteToLane', ({laneId, noteId}, state) => {
    const removeLane = state.get('lanes').find(
      (lane) => lane.notes.indexOf(noteId) >= 0
    );
    const removeLaneId = removeLane.id;
    const removeNoteIndex = removeLane.notes.findIndex(
      (note) => note === noteId
    );

    if(removeLaneId) {
      state.unset(['lanes', {id: removeLaneId}, 'notes', removeNoteIndex]);
    }

    // XXX: this would be neater. how to map id to index, though?
    //state.unset(['lanes', 'notes', noteIndex}]);

    state.push(['lanes', {id: laneId}, 'notes'], noteId);
  });
}
