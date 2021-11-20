import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide a username...'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email...'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email...'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    // not return the password when query a User
    select: false
  },
  room: {
    type: String,
    default: () => '',
  }
  // resetPasswordToken: String,
  // resetPasswordExpire: Date
});

UserSchema.pre('save', async function(next) {
  // "this.password" is the "password" from User.create-controllers.auth line 36
  !this.isModified('password') && next();

  // hash the password
  // the highter is the number from gebSalt, the more secure
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
};

export const UserModel = mongoose.model('User', UserSchema);