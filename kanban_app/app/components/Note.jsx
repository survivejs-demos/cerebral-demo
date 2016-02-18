import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      onAttach: props.onAttach
    }
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

// You need this to prevent firing off insane
// amounts of signals. Should only move once
let lastMovedToId = null;
const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(lastMovedToId !== targetId) {
      lastMovedToId = targetId;

      if(sourceId !== targetId) {
        targetProps.onMove({sourceId, targetId});
      }
    }
  },
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, onAttach, id, editing, ...props} = this.props;
    // Pass through if we are editing
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}
