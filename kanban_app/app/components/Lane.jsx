import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.note.id;

    if(!targetProps.notes.length) {
      sourceProps.onAttach({
        laneId: targetProps.id,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
@Cerebral()
export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }
  render() {
    const {connectDropTarget, id, name, notes, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name" value={name}
            onEdit={this.editName} />
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <Notes
          items={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }
  addNote(laneId) {
    this.props.signals.noteCreated({
      laneId,
      note: {task: 'New task'}
    });
  }
  editNote(id, task) {
    this.props.signals.noteUpdated({id, task});
  }
  deleteNote(laneId, noteId) {
    this.props.signals.noteDeleted({laneId, noteId});
  }
  editName(id, name) {
    if(name) {
      this.props.signals.laneUpdated({id, name});
    }
    else {
      this.props.signals.laneDeleted({id});
    }
  }
}
