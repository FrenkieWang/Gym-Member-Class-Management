const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  memberID:{ 
    type: Number
  },
  title: { 
    type: String, 
    required: true, 
    enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'] 
  },
  titleOther: {
    type: String
  },
  firstName: { 
    type: String
  },
  lastName: { 
    type: String
  },
  email: { 
    type: String
  },
  premium: { 
    type: Boolean
  },
}, { collection: 'Member' });

memberSchema.pre('validate', function(next) {
  if (this.title === 'Other' && !this.titleOther) {
    this.invalidate('titleOther', 'Title must be specified if "Other" is selected');
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;