import uuid from 'node-uuid';

export default {
  displayAllLanes(inut, state) {
    state.set(['lanes', 'ids'], Object.keys(state.get(['data', 'lanes'])));
  },

  createLane({name, notes}, state) {
    const id = uuid.v4();
    state.set(['data', 'lanes', id], {
      id: id,
      name: name,
      notes: notes || [],
    });
  },

  updateLane({id, name}, state) {
    state.set(['data', 'lanes', id, 'name'], name);
  },

  removeRelatedNotes({id}, state) {
    const notes = state.get(['data', 'lanes', id, 'notes']);
    notes.forEach((id) => state.unset(['data', 'notes', id]));
  },

  deleteLane({id}, state) {
    state.unset(['data', 'lanes', id]);
  },

  attachNoteToLane({laneId, noteId}, state) {
    const note = state.get(['data', 'notes', noteId]);
    const currentLane = state.get(['data', 'lanes', note.laneId]);
    const noteIdIndex = currentLane.notes.indexOf(noteId);

    console.log('noteIdIndex', noteIdIndex);
    state.splice(['data', 'lanes', note.laneId, 'notes'], noteIdIndex, 1);
    state.push(['data', 'lanes', laneId, 'notes'], noteId);
  },

  createNote({laneId, note}, state) {
    note.id = uuid.v4();
    note.laneId = laneId;
    state.set(['data', 'notes', note.id], note);
    state.push(['data', 'lanes', laneId, 'notes'], note.id);
  },

  updateNote({id, task}, state) {
    state.set(['data', 'notes', id, 'task'], task);
  },

  deleteNote({laneId, noteId}, state) {
    const noteIndex = state.get(['data', 'lanes', laneId, 'notes']).indexOf(noteId);
    state.splice(['data', 'lanes', laneId, 'notes'], noteIndex, 1);
    state.unset(['data', 'notes', noteId]);
  },

  // Would be better to pass the notes here, as they
  // have reference to their respective lanes. note.laneId
  moveNote({sourceNote, targetNote}, state) {
    const sourceNotesPath = ['data', 'lanes', sourceNote.laneId, 'notes'];
    const sourceNoteIndex = state.get(sourceNotesPath).indexOf(sourceNote.id);
    state.splice(sourceNotesPath, sourceNoteIndex, 1);
    state.push(['data', 'lanes', targetNote.laneId, 'notes'], sourceNote.id);
  },
};
