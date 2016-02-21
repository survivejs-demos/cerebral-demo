function updateNote({input, state}) {
  const note = state.get(`kanban.data.notes.${input.id}`);

  state.merge(`kanban.data.notes.${input.id}`, input);
};

export default updateNote;
