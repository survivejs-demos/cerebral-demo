import uuid from 'node-uuid';
import update from 'react/lib/update';

export default (controller) => {
  controller.signal('noteCreated', ({laneId, note}, state) => {
    note.id = uuid.v4();

    state.push('notes', note);

    // XXX: it would be a good idea to check that the lane exists
    // before doing this
    state.push(['lanes', {id: laneId}, 'notes'], note.id);
  });
  controller.signal('noteUpdated', ({id, task}, state) => {
    state.set(['notes', {id}, 'task'], task);
  });
  controller.signal('noteDeleted', ({laneId, noteId}, state) => {
    // XXX: this doesn't work. it should seek note id first! fails silently!!!
    state.unset(['lanes', {id: laneId}, 'notes', noteId]);

    state.unset(['notes', {id: noteId}]);
  });
  controller.signal('noteMoved', ({sourceId, targetId}, state) => {
    const lanes = state.get('lanes');
    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceId) >= 0;
    })[0];
    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetId) >= 0;
    })[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);

    if(sourceLane === targetLane) {
      const newNotes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });

      state.set(['lanes', {id: sourceLane.id}, 'notes'], newNotes);
    }
    else {
      // get rid of the source
      state.unset(['lanes', {id: sourceLane.id}, 'notes', sourceNoteIndex]);

      // and move it to the target
      state.splice(['lanes', {id: targetLane.id}, 'notes'], [targetNoteIndex, 0, sourceId]);
    }
  });
}
