import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = props => (
  <div className="item-list__header">
    <button
      className="button"
      onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedNoteId', res);
          }
        });
      }}
    >Create Note
    </button>
  </div>
);

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired,
};

export default createContainer(() => ({
  meteorCall: Meteor.call,
  Session,
}), NoteListHeader);
