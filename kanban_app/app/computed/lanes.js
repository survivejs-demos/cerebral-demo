function lanes(get) {
  return get('kanban.lanes').map((laneId) => {
    const lane = get(`kanban.data.lanes.${laneId}`);

    return {
      ...lane,
      notes: lane.notes ? lane.notes.map((noteId) => get(`kanban.data.notes.${noteId}`)) : []
    };
  });
}

export default lanes;
