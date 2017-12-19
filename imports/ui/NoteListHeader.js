import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListHeader = props => (
  <div>
    <button onClick={() => {
      props.meteorCall('notes.insert');
    }}
    >Create Note
    </button>
  </div>
);

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
};

export default createContainer(() => ({
  meteorCall: Meteor.call,
}), NoteListHeader);
