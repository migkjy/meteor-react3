import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', () => {
    it('should show error messages', () => {
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', () => {
      const email = 'migkjy@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      // creatUser need 2 arguments
      // first argument is {email, password}
      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', () => {
      const email = 'migkjy@test.com';
      const password = '123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it('should call createUser callback errors', () => {
      const password = 'password123';
      const reason = 'This is whiy it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      // const err = { reason };
      // spy.calls[0].arguments[1](err);
      spy.calls[0].arguments[1]({ reason }); // 이걸로 충분
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
