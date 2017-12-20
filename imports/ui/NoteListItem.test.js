import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
// import moment from 'moment';
import { mount } from 'enzyme';

import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    it('should render title and timestamp', () => {
      const title = 'My title here';
      const updatedAt = 1513751768935;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);
      // expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('M/DD/YY'));
      expect(wrapper.find('p').text()).toBe('12/20/17');
    });

    it('should set default title if no title set', () => {
      const wrapper = mount(<NoteListItem note={{}} />);

      // const untitled = 'Untitled note';
      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
