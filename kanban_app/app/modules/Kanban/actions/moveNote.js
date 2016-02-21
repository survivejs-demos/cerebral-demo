function moveNote({input, state}) {
  const {sourceId, targetId} = input;
  const kanban = state.select('kanban');
  const sourceLaneId = kanban.get(`data.notes.${sourceId}.laneId`);
  const targetLaneId = kanban.get(`data.notes.${targetId}.laneId`);
  const sourceLane = kanban.get(`data.lanes.${sourceLaneId}`);
  const targetLane = kanban.get(`data.lanes.${targetLaneId}`);
  const sourceNotesPath = `data.lanes.${sourceLaneId}.notes`;
  const targetNotesPath = `data.lanes.${targetLaneId}.notes`;

  kanban.splice(sourceNotesPath, sourceLane.notes.indexOf(sourceId), 1);

  if(sourceLane === targetLane) {
    kanban.splice(sourceNotesPath, sourceLane.notes.indexOf(targetId), 0, sourceId);
  }
  else {
    kanban.splice(targetNotesPath, sourceLane.notes.indexOf(targetId), 0, sourceId);
    kanban.set(`data.notes.${sourceId}.laneId`, targetLaneId);
  }
};

export default moveNote;
