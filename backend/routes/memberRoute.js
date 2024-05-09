const router = require('express').Router();
let Member = require('../models/memberModel');

const generateRandomMember = require('./faker/fakerMember'); 

router.route('/generate-member').get((request, response) => {
  const member = generateRandomMember(); 
  console.log(member);
  response.json(member);
});

router.route('/get').get((request, response) => {
  Member.find()
    .then(members => response.json(members))
    .catch(error => response.status(400).json(error));
});

router.route('/create').post((request, response) => {
  const newMember = new Member(request.body);  
  
  newMember.save()
    .then(() => response.json('Member added!'))
    .catch(error => response.status(400).json(error));
});

router.route('/get/:id').get((request, response) => {
  Member.findById(request.params.id)
    .then(member => response.json(member))
    .catch(error => response.status(400).json(error));
});

router.route('/delete/:id').delete((request, response) => {
  Member.findByIdAndDelete(request.params.id)
    .then(() => response.json('Member deleted.'))
    .catch(error => response.status(400).json(error));
});

router.route('/update/:id').put((request, response) => {
  Member.findByIdAndUpdate(request.params.id,
    request.body, { new: true, runValidators: true })
      .then(member => response.json(member))
      .catch(error => response.status(400).json(error));
});

module.exports = router;