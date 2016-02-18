import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Lane from './Lane.jsx';

@Cerebral({
  lanes: ['lanes', 'list']
})
export default class Lanes extends React.Component {
  render() {
    const lanes = this.props.lanes;

    return <div className="lanes">{lanes.map(this.renderLane)}</div>;
  }
  renderLane(lane) {
    return <Lane className="lane" key={lane.id} lane={lane} />;
  }
}
