import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

@Cerebral({
  kanban: 'kanban'
})
export default class Notes extends React.Component {
  render() {
    const notes = this.props.notes;

    return <ul className="notes">{notes.map(this.renderNote)}</ul>;
  }
  renderNote = (note) => {
    const {onValueClick, onEdit, onDelete} = this.props;

    return (
      <Note className="note" id={note.id} key={note.id}
        editing={note.editing} onAttach={this.attachNote}
        onMove={this.moveNote}>
        <Editable
          editing={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(null, note.id)}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </Note>
    );
  };
  moveNote = ({sourceId, targetId}) => {
    this.props.signals.kanban.noteMoved({sourceId, targetId});
  };
  attachNote = ({laneId, noteId}) => {
    this.props.signals.kanban.noteAttachedToLane.sync({laneId, noteId});
  };
}
