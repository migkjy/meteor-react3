import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = ((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validate({ email });

  return true;
});

if (Meteor.isServer) {
  // Accounts.validateNewUser() is a server side method, so not working on client side.
  // so need to be inside of if(){}
  Accounts.validateNewUser(validateNewUser);
}


// Accounts.validateNewUser((user) => {
//   const email = user.emails[0].address;

//   new SimpleSchema({
//     email: {
//       type: String,
//       regEx: SimpleSchema.RegEx.Email,
//     },
//   }).validate({ email });

//   return true;
// });
