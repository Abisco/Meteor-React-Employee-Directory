//Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

//ran meteor remove autopublish in the terminal to ensure not all data is given to user

Meteor.startup(() => {
  //Great place to generate data

  //Need fake data to stay, check to see if we need to add fake data, if empty, we add data
  //Can go find records, but not going to do it yet!
  const numberRecords = Employees.find({}).count();

  console.log(numberRecords);

  if (!numberRecords) {
    _.times(5000, () => {
      //helper to avoid for loop, execute 5000 times
      //Creates a 'card' with name email and phone
      const { name, email, phone } = helpers.createCard();

      //We have the fake details, gotta insert it into the employees database
      Employees.insert({
        /**name: name,
        email: email,
        phone: phone**/
        //line below is same as the lines above
        name, email, phone,
        //create image for the user
        avatar: image.avatar()
      });

    });
  }
  Meteor.publish('employees', function(per_page) {
    //Ask for the first 20 records, dont overwhelm the entire program
    //Had to remove the autopublish directory by typing in the terminal: meteor remove autopublish
    //Also install react meteor data: Creates container, a function which updates some data whenever subscription changes
    return Employees.find({}, { limit: per_page });
  });
});
