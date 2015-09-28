import React from 'react/addons';
import TestBackend from 'react-dnd/modules/backends/Test';
import {DragDropContext} from 'react-dnd';
import assert from 'assert';
import Note from 'app/components/Note.jsx';

const {renderIntoDocument} = React.addons.TestUtils;

describe('Note', () => {
  it('renders children', () => {
    // XXXXX: conflicts with cerebral due to context
    // yields TypeError: 'undefined' is not an object (evaluating 'this.context.controller.signals')

    return;

    const test = 'test';
    const NoteContent = wrapInTestContext(Note);
    const component = renderIntoDocument(
      <NoteContent>{test}</NoteContent>
    );

    assert.equal(component.props.children, test);
  });
});

// https://gaearon.github.io/react-dnd/docs-testing.html
function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestContextContainer extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return TestContextContainer;
}
