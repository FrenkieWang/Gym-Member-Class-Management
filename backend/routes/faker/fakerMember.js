const { faker } = require('@faker-js/faker');

function generateRandomMember() {
  const thisTitle = faker.helpers.arrayElement(['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'])

  const member = {
    memberID: faker.number.int({ min: 1, max: 99999 }),  
    title: thisTitle,
    titleOther: thisTitle === 'Other' ? faker.lorem.word() : undefined,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    premium: faker.datatype.boolean() 
  };

  return member;
}

module.exports = generateRandomMember;