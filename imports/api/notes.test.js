import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', () => {
    beforeEach(() => {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        body: 'My body for note',
        updatedAt: 0,
        userId: 'testUserId1',
      });
    });

    it('should insert new note', () => {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      Notes.findOne({ _id, userId: 'testId' });

      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it('should not insert note if not authenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', () => {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' }, ['testNoteId1']);
      // apply({context}, {...params});
      expect(Notes.findOne({ _id: 'testNoteId1' })).toBeFalsy();
    });

    it('should not remove note if unauthenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, ['testNoteId1']);
      }).toThrow();
    });

    it('should not remove note if invalid _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' });
      }).toThrow();
    });
  });
}

