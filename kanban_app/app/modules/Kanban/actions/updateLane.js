function updateLane({input, state}) {
  const lane = state.get(`kanban.data.lanes.${input.id}`);

  state.merge(`kanban.data.lanes.${input.id}`, input);
};

export default updateLane;
