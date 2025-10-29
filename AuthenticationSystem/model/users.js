import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'legal first Name'],
      uppercase: true,
    },
    lastName: {
      type: String,
      required: [true, 'legal first Name'],
      uppercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
      lowercase: true,
      match: [/^[\w.-]+@[\w.-]+\.\w+$/, 'please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'password field should not be empty'],
      minlength: [6, 'password length must be atleast 12 characters'],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, 'confirm password is required'],
    //   select: false,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model('User', userSchema);

export default User;
