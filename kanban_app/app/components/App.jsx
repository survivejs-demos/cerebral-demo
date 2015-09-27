import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Lanes from './Lanes.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
@Cerebral({})
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }
  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addItem}>+</button>
        <Lanes />
      </div>
    );
  }
  addItem() {
    this.props.signals.laneCreated({name: 'New lane'});
  }
}
