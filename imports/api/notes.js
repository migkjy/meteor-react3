import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert': function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf(), // new Date().getTime(),
    });
  },
  'notes.remove': function (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    return Notes.remove({ _id, userId: this.userId });
  },

});
