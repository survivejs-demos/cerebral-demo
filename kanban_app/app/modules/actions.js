import uuid from 'node-uuid';

export function displayAllLanes({state}) {
  state.set(['lanes', 'ids'], Object.keys(state.get(['data', 'lanes'])));
};

export function createLane({input, state}) {
  const id = uuid.v4();

  state.set(['data', 'lanes', id], {
    id: id,
    name: input.name,
    notes: []
  });
};

export function updateLane({input, state}) {
  const lane = state.get(['data', 'lanes', input.id]);

  state.set(['data', 'lanes', input.id], Object.assign({}, lane, input));
};

export function removeRelatedNotes({input, state}) {
  const notes = state.get(['data', 'lanes', input.id, 'notes']);

  notes.forEach((id) => state.unset(['data', 'notes', input.id]));
};

export function deleteLane({input, state}) {
  const indexOfLane = state.get(['lanes', 'ids']).indexOf(input.id);

  state.splice(['lanes', 'ids'], indexOfLane, 1);
  state.unset(['data', 'lanes', input.id]);
};

export function attachNoteToLane({input, state}) {
  const {laneId, noteId} = input;

  const note = state.get(['data', 'notes', noteId]);
  const currentLane = state.get(['data', 'lanes', note.laneId]);
  const noteIdIndex = currentLane.notes.indexOf(noteId);

  if(note.laneId === laneId) {
    return;
  }

  state.set(['data', 'notes', noteId, 'laneId'], laneId);
  state.splice(['data', 'lanes', note.laneId, 'notes'], noteIdIndex, 1);
  state.push(['data', 'lanes', laneId, 'notes'], noteId);
};

export function createNote({input, state}) {
  const {laneId, note} = input;

  note.id = uuid.v4();
  note.laneId = laneId;

  state.set(['data', 'notes', note.id], note);
  state.push(['data', 'lanes', laneId, 'notes'], note.id);
};

export function updateNote({input, state}) {
  const note = state.get(['data', 'notes', input.id]);

  state.set(['data', 'notes', input.id], Object.assign({}, note, input));
};

export function deleteNote({input, state}) {
  const {laneId, noteId} = input;
  const noteIndex = state.get(['data', 'lanes', laneId, 'notes']).indexOf(noteId);

  state.splice(['data', 'lanes', laneId, 'notes'], noteIndex, 1);
  state.unset(['data', 'notes', noteId]);
};

export function moveNote({input, state}) {
  const {sourceNote, targetNote} = input;

  const sourceNotesPath = ['data', 'lanes', sourceNote.laneId, 'notes'];
  const sourceNotes = state.get(sourceNotesPath);
  const sourceNoteIndex = sourceNotes.indexOf(sourceNote.id);

  // XXXXX: bugs out if you drag to another lane and then back
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
};
