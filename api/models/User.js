const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, index: true }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = (module.exports = mongoose.model('User', userSchema))
