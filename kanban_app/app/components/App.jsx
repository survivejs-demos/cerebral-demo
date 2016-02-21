import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Lanes from './Lanes.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
@Cerebral()
export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addItem}>+</button>
        <Lanes />
      </div>
    );
  }
  addItem = () => {
    this.props.signals.kanban.laneCreated({name: 'New lane'});
  };
}
