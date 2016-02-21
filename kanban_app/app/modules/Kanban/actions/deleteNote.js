function deleteNote({input, state}) {
  const {laneId, noteId} = input;
  const noteIndex = state.get(`kanban.data.lanes.${laneId}.notes`).indexOf(noteId);

  state.splice(`kanban.data.lanes.${laneId}.notes`, noteIndex, 1);
  state.unset(`kanban.data.notes.${noteId}`);
};

export default deleteNote;
