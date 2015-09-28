import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

@Cerebral()
export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.renderNote = this.renderNote.bind(this);
    this.moveNote = this.moveNote.bind(this);
    this.attachNote = this.attachNote.bind(this);
  }
  render() {
    const notes = this.props.items;
    return <ul className="notes">{notes.map(this.renderNote)}</ul>;
  }
  renderNote(note) {
    return (
      <Note className="note"
        onMove={this.moveNote} onAttach={this.attachNote}
        note={note} key={`note${note.id}`}>
        <Editable
          value={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)} />
      </Note>
    );
  }
  moveNote({sourceNote, targetNote}) {
    this.props.signals.noteMoved.sync({sourceNote, targetNote});
  }
  attachNote({laneId, noteId}) {
    this.props.signals.noteAttachedToLane.sync({laneId, noteId});
  }
}
