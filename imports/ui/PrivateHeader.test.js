import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount(<PrivateHeader title="Test title" handleLogout={() => {}} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', () => {
      const title = 'Test title here';
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />);
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });

    // it('should call the function', function () {
    //   const spy = expect.createSpy();
    //   spy(3, 4, 123);
    //   spy('Andrew');
    //   expect(spy).toHaveBeenCalledWith('Andrew');
    // });

    it('should call handleLogout on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
}
