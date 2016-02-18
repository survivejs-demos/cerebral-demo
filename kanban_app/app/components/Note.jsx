import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      note: props.note,
      onAttach: props.onAttach
    }
  },
};

// You need this to prevent firing off insane
// amounts of signals. Should only move once
let lastMovedTo = null;
const noteTarget = {
  hover(targetProps, monitor) {
    const sourceNote = monitor.getItem().note;
    const targetNote = targetProps.note;
    if (lastMovedTo !== targetNote.id) {
      lastMovedTo = targetNote.id;
      if(sourceNote.id !== targetNote.id) {
        targetProps.onMove({sourceNote, targetNote});
      }
    }
  },
};

@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, onAttach, note, editing, ...props} = this.props;
    // Pass through if we are editing
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}
