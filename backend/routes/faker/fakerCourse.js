const { faker } = require('@faker-js/faker');

function generateRandomCourse() {
  const course = {
    courseID: faker.number.int({ min: 1000, max: 99999 }),
    courseName: faker.commerce.productName(),
    courseDay: faker.helpers.arrayElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    sessionLength: faker.number.int({ min: 1, max: 12 }),  
    price: parseFloat(faker.finance.amount({ min: 100, max: 500, dec: 2 })), 
    memberNumber: faker.number.int({ min: 0, max: 30 })  
  };

  return course;
}

module.exports = generateRandomCourse;
