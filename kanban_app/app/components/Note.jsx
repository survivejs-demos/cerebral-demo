import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    return props.note;
  },
};

let prevTarget = null;
const noteTarget = {
  hover(targetProps, monitor) {

    const sourceNote = monitor.getItem();
    if (!prevTarget || (prevTarget !== targetProps.note && sourceNote.id !== targetProps.note.id)) {
      prevTarget = targetProps.note;
      const targetNote = targetProps.note;
      targetProps.onMove({sourceNote, targetNote});
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
    const {connectDragSource, connectDropTarget,
      onMove, id, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li {...props}>{props.children}</li>
    ));
  }
}
