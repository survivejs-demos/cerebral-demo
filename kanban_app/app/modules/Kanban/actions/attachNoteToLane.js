function attachNoteToLane({input, state}) {
  const {laneId, noteId} = input;
  const kanban = state.select('kanban');

  const note = kanban.get(`data.notes.${noteId}`);
  const currentLane = kanban.get(`data.lanes.${note.laneId}`);
  const noteIdIndex = currentLane.notes.indexOf(noteId);

  if(note.laneId === laneId) {
    return;
  }

  kanban.set(`data.notes.${noteId}.laneId`, laneId);
  kanban.splice(`data.lanes.${note.laneId}.notes`, noteIdIndex, 1);
  kanban.push(`data.lanes.${laneId}.notes`, noteId);
};

export default attachNoteToLane;
