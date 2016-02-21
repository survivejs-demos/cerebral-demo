function removeRelatedNotes({input, state}) {
  const notes = state.get(`kanban.data.lanes.${input.id}.notes`);

  state.unset('kanban.data.notes', notes);
};

export default removeRelatedNotes;
