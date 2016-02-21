function deleteLane({input, state}) {
  const lanes = state.get('kanban.lanes');

  state.set('kanban.lanes', lanes.filter((id) => id !== input.id));
  state.unset(`kanban.data.lanes.${input.id}`);
};

export default deleteLane;
