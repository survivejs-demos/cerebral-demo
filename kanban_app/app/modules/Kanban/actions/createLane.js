function createLane({input, state, services}) {
  const id = services.kanban.uuid.v4();

  state.set(`kanban.data.lanes.${id}`, {
    id: id,
    name: input.name,
    notes: []
  });
};

export default createLane;
