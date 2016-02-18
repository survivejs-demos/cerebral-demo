import * as actions from './actions';

export default (options = {}) => {
  return (module) => {
    module.addSignals({
      // LANES
      laneCreated: [actions.createLane, actions.displayAllLanes],
      laneUpdated: [actions.updateLane],
      laneDeleted: [
        actions.removeRelatedNotes, actions.deleteLane, actions.displayAllLanes
      ],
      noteAttachedToLane: [actions.attachNoteToLane],

      // NOTES
      noteCreated: [actions.createNote],
      noteUpdated: [actions.updateNote],
      noteDeleted: [actions.deleteNote],
      noteMoved: [actions.moveNote]
    });

    return {};
  }
};
