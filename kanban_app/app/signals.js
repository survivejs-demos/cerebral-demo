import {
  createLane,
  updateLane,
  removeRelatedNotes,
  deleteLane,
  attachNoteToLane,
  createNote,
  deleteNote,
  updateNote,
  moveNote,
  displayAllLanes
} from './actions.js';

export default function (controller) {

  // LANES
  controller.signal('laneCreated', createLane, displayAllLanes);
  controller.signal('laneUpdated', updateLane);
  controller.signal('laneDeleted', removeRelatedNotes, deleteLane, displayAllLanes);
  controller.signal('noteAttachedToLane', attachNoteToLane);

  // NOTES
  controller.signal('noteCreated', createNote);
  controller.signal('noteUpdated', updateNote);
  controller.signal('noteDeleted', deleteNote);
  controller.signal('noteMoved', moveNote);

};
