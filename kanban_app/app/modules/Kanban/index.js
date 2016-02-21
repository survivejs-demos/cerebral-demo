import storage from '../../storage';

import laneCreated from './signals/laneCreated';
import laneUpdated from './signals/laneUpdated';
import laneDeleted from './signals/laneDeleted';
import noteAttachedToLane from './signals/noteAttachedToLane';
import noteCreated from './signals/noteCreated';
import noteUpdated from './signals/noteUpdated';
import noteDeleted from './signals/noteDeleted';
import noteMoved from './signals/noteMoved';

import uuid from './services/uuid';

export default (options = {}) => {
  return (module) => {

    const data = storage.get('cerebral_app') || {
      lanes: {},
      notes: {},
    };

    module.addState({
      data: data,
      lanes: Object.keys(data.lanes)
    });

    module.addSignals({
      // LANES
      laneCreated,
      laneUpdated,
      laneDeleted,
      noteAttachedToLane,

      // NOTES
      noteCreated,
      noteUpdated,
      noteDeleted,
      noteMoved
    });

    module.addServices({
      uuid
    });

    return {};
  }
};
