import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', () => {
    it('should show error messages', () => {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', () => {
      const email = 'migkjy@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      // use node to get in HTMLInputElement
      // can study at
      // https://developer.mozilla.org/ko/docs/Web/API/HTMLInputElement
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;

      // simulating app 'submit'
      wrapper.find('form').simulate('submit');

      // loginWithPassword need 3 prams = {email}, password, function()
      // at first call(calls[0]),
      // first argument(arguments[0]) is email(object)
      // second argument(arguments[1]) is password(string)
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should call loginWithPassword callback errors', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      // loginWithPassword need 3 prams = {email}, password, function()
      // at first call(calls[0]),
      // third argument(arguments[1]) is a function() setting state.
      spy.calls[0].arguments[2]({});
      // checking state has been changed when calling with ({}) - something?
      expect(wrapper.state('error').length).toNotBe(0);

      spy.calls[0].arguments[2]();
      // checking state has been changed when calling with () - nothing?
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
