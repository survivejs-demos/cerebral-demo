function displayAllLanes({state}) {
  state.set('kanban.lanes', Object.keys(state.get('kanban.data.lanes')));
};

export default displayAllLanes;
