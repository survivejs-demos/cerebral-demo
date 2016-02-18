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

  // XXX: figure out why this leaves a reference hanging
  state.splice(['lanes', 'ids'], indexOfLane, 1);
  state.unset(['data', 'lanes', input.id]); // XXX: does this work???
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
  const {sourceId, targetId} = input;
  const sourceLaneId = state.get(['data', 'notes', sourceId, 'laneId']);
  const targetLaneId = state.get(['data', 'notes', targetId, 'laneId']);
  const sourceLane = state.get(['data', 'lanes', sourceLaneId]);
  const targetLane = state.get(['data', 'lanes', targetLaneId]);
  const sourceNotesPath = ['data', 'lanes', sourceLaneId, 'notes'];
  const targetNotesPath = ['data', 'lanes', targetLaneId, 'notes'];

  state.splice(sourceNotesPath, sourceLane.notes.indexOf(sourceId), 1);

  if(sourceLane === targetLane) {
    state.splice(sourceNotesPath, sourceLane.notes.indexOf(targetId), 0, sourceId);
  }
  else {
    state.splice(targetNotesPath, sourceLane.notes.indexOf(targetId), 0, sourceId);
    state.set(['data', 'notes', sourceId, 'laneId'], targetLaneId);
  }
};
