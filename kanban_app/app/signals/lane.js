import uuid from 'node-uuid';

export default (controller) => {
  controller.signal('laneCreated', (lane, state) => {
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    state.push('lanes', lane);
  });
  controller.signal('laneUpdated', ({id, name}, state) => {
    state.set(['lanes', {id}, 'name'], name);
  });
  controller.signal('laneDeleted', (id, state) => {
    state.unset(['lanes', {id}]);

    // XXX: it would be a good idea to seek and destroy possible
    // associated notes. now they remain hanging in the memory
  });
}
