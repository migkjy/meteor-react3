import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader', () => {
    let meteorCall;
    let Session;

    beforeEach(() => {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy(),
      };
    });

    it('should call meteorCall on click', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      // props.meteorCall('notes.insert', (err, res) => {
      //   if (res) {
      //     props.Session.set('selectedNoteId', res);
      //   }
      // });
      // 위의 내용에 반영시키는 것. arguments[0]은 'notes.insert', [1]은 function(err, res){...}
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      // error가 발생한 상황으로, err에 param을 입력해줬음
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
