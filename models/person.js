const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  criminalStatus: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  cnicNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Person', PersonSchema);
