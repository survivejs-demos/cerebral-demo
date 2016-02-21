function createNote({input, state, services}) {
  const {laneId, note} = input;

  note.id = services.kanban.uuid.v4();
  note.laneId = laneId;

  state.set(`kanban.data.notes.${note.id}`, note);
  state.push(`kanban.data.lanes.${laneId}.notes`, note.id);
};

export default createNote;
