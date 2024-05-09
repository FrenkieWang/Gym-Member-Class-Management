const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseID:{ 
    type: Number
  },
  courseName: { 
    type: String
  },
  courseDay: { 
    type: String,
    required: true, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  sessionLength: { 
    type: Number
  },
  price: { 
    type: Number
  },
  memberNumber: { 
    type: Number
  }  
}, { collection: 'Course' });


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;