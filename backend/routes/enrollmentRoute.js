const router = require('express').Router();
let Enrollment = require('../models/enrollmentModel');

/*
const generateRandomEnrollment = require('./faker/fakerEnrollment'); 

router.route('/generate-enrollment').get((request, response) => {
  const enrollment = generateRandomEnrollment(); 
  console.log(enrollment);
  response.json(enrollment);
});
*/

router.route('/get').get((request, response) => {
  Enrollment.find()
    .populate('memberID', 'firstName lastName')  
    .populate({
      path: 'classBasket',
      select: 'courseName'  
    })
    .then(enrollments => response.json(enrollments))
    .catch(error => response.status(400).json(error));
});

router.route('/create').post((request, response) => {
  const newEnrollment = new Enrollment(request.body);

  newEnrollment.save()
    .then(() => response.json('Enrollment added!'))
    .catch(error => response.status(400).json(error));
});

router.route('/get/:id').get((request, response) => {
  Enrollment.findById(request.params.id)
    .populate('memberID', 'firstName lastName')  
    .populate({
      path: 'classBasket',
      select: 'courseName'  
    })
    .then(enrollment => response.json(enrollment))
    .catch(error => response.status(400).json(error));
});

router.route('/delete/:id').delete((request, response) => {
  Enrollment.findByIdAndDelete(request.params.id)
    .then(() => response.json('Enrollment deleted.'))
    .catch(error => response.status(400).json(error));
});

router.route('/update/:id').put((request, response) => {
  Enrollment.findByIdAndUpdate(request.params.id,
    request.body, { new: true, runValidators: true })
      .then(enrollment => response.json(enrollment))
      .catch(error => response.status(400).json(error));
});

module.exports = router;