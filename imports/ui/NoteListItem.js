import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { createConnection } from 'net';

export const NoteListItem = props => (
  <div onClick={() => {
    props.Session.set('selectedNoteId', props.note._id);
  }}
  >
    <h5 className="item__title">{ props.note.title || 'Untitled note' }</h5>
    <p className="item__subtitle">{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
  </div>
);

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired,
};

export default createContainer(() => ({ Session }), NoteListItem);
