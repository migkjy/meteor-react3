import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', () => {
    let browserHistory;
    let call;

    beforeEach(() => {
      // ways of creating spy is different. because usage in Editor is different. browserHistory.push is used
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy(),
      };
    });

    it('should render pick note message', () => {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render notFound message', () => {
      const wrapper = mount(<Editor selectedNoteId="asd" browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    it('should remove note', () => {
      const wrapper = mount(<Editor note={notes[0]} browserHistory={browserHistory} call={call} />);
      wrapper.find('button').simulate('click');
      // 그냥 소환이 돼었는지, 그리고 소환을 시킬때 제대로 params를 보내는지만 보면 된다.
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    it('should update the note body on textarea change', () => {
      const newBody = 'new text';
      const wrapper = mount(<Editor note={notes[0]} browserHistory={browserHistory} call={call} />);
      // target.value selecting
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody,
        },
      });

      //   this.state.body selecting
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('should update the note title on input change', () => {
      const newTitle = 'new title';
      const wrapper = mount(<Editor note={notes[0]} browserHistory={browserHistory} call={call} />);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle,
        },
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('should set state for new note', () => {
      const wrapper = mount(<Editor note={notes[0]} browserHistory={browserHistory} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0],
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if note prop not provided', () => {
      const wrapper = mount(<Editor note={notes[0]} browserHistory={browserHistory} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });
  });
}
