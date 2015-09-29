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
    // XXXXX: fails with
    // Uncaught TypeError: Cannot read property 'id' of undefined
    const indexOfLane = state.get(['lanes', 'ids']).indexOf(id);
    state.splice(['lanes', 'ids'], indexOfLane, 1);
    state.unset(['data', 'lanes', id]);
  },

  attachNoteToLane({laneId, noteId}, state) {
    const note = state.get(['data', 'notes', noteId]);
    const currentLane = state.get(['data', 'lanes', note.laneId]);
    const noteIdIndex = currentLane.notes.indexOf(noteId);

    if(note.laneId === laneId) {
      return;
    }

    state.set(['data', 'notes', noteId, 'laneId'], laneId);
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

  moveNote({sourceNote, targetNote}, state) {
    const sourceNotesPath = ['data', 'lanes', sourceNote.laneId, 'notes'];
    const sourceNotes = state.get(sourceNotesPath);
    const sourceNoteIndex = sourceNotes.indexOf(sourceNote.id);

    if(sourceNote.laneId === targetNote.laneId) {
      const targetNoteIndex = sourceNotes.indexOf(targetNote.id);
      state.splice(sourceNotesPath, sourceNoteIndex, 1);
      state.splice(sourceNotesPath, targetNoteIndex, 0, sourceNote.id);

    }
    else {

      state.splice(sourceNotesPath, sourceNoteIndex, 1);
      state.set(['data', 'notes', sourceNote.id, 'laneId'], targetNote.laneId);
      state.push(['data', 'lanes', targetNote.laneId, 'notes'], sourceNote.id);

    }
  },
};
