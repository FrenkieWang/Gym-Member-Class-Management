const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    memberID: { 
      type: Schema.Types.ObjectId, 
      ref: 'Member', 
      required: true 
    },
    classBasket: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Course',
      required: true,
    }]
  }, { collection: 'Enrollment' });

enrollmentSchema.pre('validate', function(next) {
  if (!this.classBasket || this.classBasket.length !== 3) {
    this.invalidate('classBasket', 'Gym members must exactly take 3 classes!');
  }
  next();
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;