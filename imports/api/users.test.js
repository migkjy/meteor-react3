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
<<<<<<< HEAD
      }).toThrow();
=======
      }).toNotThrow();
>>>>>>> 1ab3365072515418d35318d3e9693ebb3e3f41b6
    });
  });
}

