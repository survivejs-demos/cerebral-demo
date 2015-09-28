import Controller from 'cerebral';
import Model from 'cerebral-baobab';

// TODO: load the initial state of the app from localStorage here
const model = Model({

  lanes: [],
  notes: [],

  /*
    CHRISTIAN:
    // Typically you use objects to store data and use
    // monkeys to display that data
    lanes: {},
    notes: {},

    // Not knowing exactly how the data relates, this is how
    // lanes could displays notes
    currentLaneId: null, // This state defines active line using ID of it
    currentLane: Model.monkey({
      cursors: {
        id: ['currentLaneId'],
        lanes: ['lanes'],
        notes: ['notes']
      },
      get(data) {
        if (!data.id) {
          return null;
        }

        const lane = data.lanes[data.id];

        return {
          name: lane.name,
          notes: lane.notes.map((noteId) => data.notes[nodeId])
        };
      }
    })

  */
});

model.tree.on('update', (e) => {
  // TODO: write the new state to localStorage
  console.log('tree updated', e);
});

export default Controller(model);
