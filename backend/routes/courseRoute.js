const router = require('express').Router();
let Course = require('../models/courseModel');

const generateRandomCourse = require('./faker/fakerCourse'); 

router.route('/generate-course').get((request, response) => {
  const course = generateRandomCourse(); 
  console.log(course);
  response.json(course);
});

router.route('/get').get((request, response) => {
  Course.find()
    .then(courses => response.json(courses))
    .catch(error => response.status(400).json(error));
});

router.route('/create').post((request, response) => {
  const newCourse = new Course(request.body);

  newCourse.save()
    .then(() => response.json('Course added!'))
    .catch(error => response.status(400).json(error));
});

router.route('/get/:id').get((request, response) => {
  Course.findById(request.params.id)
    .then(course => response.json(course))
    .catch(error => response.status(400).json(error));
});

router.route('/delete/:id').delete((request, response) => {
  Course.findByIdAndDelete(request.params.id)
    .then(() => response.json('Course deleted.'))
    .catch(error => response.status(400).json(error));
});

router.route('/update/:id').put((request, response) => {
  Course.findByIdAndUpdate(request.params.id,
    request.body, { new: true, runValidators: true })
      .then(course => response.json(course))
      .catch(error => response.status(400).json(error));
});

module.exports = router;