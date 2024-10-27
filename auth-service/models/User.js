const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: false,
    default: 'user'
  }
});

UserSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('user', UserSchema);

