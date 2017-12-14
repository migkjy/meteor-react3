import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

//  test result only appear on Server side
if (Meteor.isServer) {
  describe('users', () => {
    it('should allow valid email address', () => {
      const testUser = {
        emails: [
          {
            address: 'Test@example.com',
          },
        ],
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email', () => {
      const testUser = {
        emails: [
          {
            address: 'Test#example.com',
          },
        ],
      };
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}

