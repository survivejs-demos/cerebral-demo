import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      sourceProps.onAttach({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
@Cerebral({
  kanban: 'kanban'
})
export default class Lane extends React.Component {
  render() {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
      <div className="lane-header" onClick={this.activateLaneEdit}>
        <div className="lane-add-note">
          <button onClick={this.addNote}>+</button>
        </div>
        <Editable className="lane-name" editing={lane.editing}
          value={lane.name} onEdit={this.editName} />
        <div className="lane-delete">
          <button onClick={this.deleteLane}>x</button>
        </div>
      </div>
        <Notes
          notes={lane.notes}
          onValueClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }
  editNote = (id, task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      this.props.signals.kanban.noteUpdated({id, editing: false});

      return;
    }

    this.props.signals.kanban.noteUpdated({id, task, editing: false});
  };
  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;

    this.props.signals.kanban.noteCreated({
      laneId,
      note: {task: 'New task'}
    });
  };
  deleteNote = (noteId, e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;

    this.props.signals.kanban.noteDeleted({laneId, noteId});
  };
  editName = (name) => {
    const laneId = this.props.lane.id;

    // Don't modify if trying set an empty value
    if(!name.trim()) {
      this.props.signals.kanban.laneUpdated({id: laneId, editing: false});

      return;
    }

    this.props.signals.kanban.laneUpdated({id: laneId, name, editing: false});
  };
  deleteLane = (event) => {
    event.stopPropagation();
    const laneId = this.props.lane.id;

    this.props.signals.kanban.laneDeleted({id: laneId});
  };
  activateLaneEdit = () => {
    const id = this.props.lane.id;

    this.props.signals.kanban.laneUpdated({id, editing: true});
  };
  activateNoteEdit = (id) => {
    this.props.signals.kanban.noteUpdated({id, editing: true});
  };
}
