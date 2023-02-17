const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// validator is used to check emails , password ...
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

// static signup method

userSchema.statics.signup = async function (email, password) {
  let error = { emailER: "", passwordER: "" };
  // validation logics
  if (!email || !password) {
    error.emailER = "Please enter all required fields";
    error.passwordER = "Please enter all required fields";
    return error;
  }
  if (!validator.isEmail(email)) {
    error.emailER = "Please enter a valid email";
    return error;
  }
  if (!validator.isStrongPassword(password)) {
    error.passwordER = "Please enter a strong password";
    return error;
  }
  // "this" is the model
  const exist = await this.findOne({ email });
  if (exist) {
    error.emailER = " email already exists";
    return error;
  }
  {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    let user = new this({ email, password: hash });
    return user.save();
  }
};

userSchema.statics.login = async function (email, password) {
  let error = { emailER: "", passwordER: "" };
  if (!email || !password) {
    error.emailER = "Please enter all required fields";
    error.passwordER = "Please enter all required fields";
    return error;
  }
  const User = await this.findOne({ email });

  if (!User) {
    error.emailER = " there is no user with that email";
    return error;
  }
  const match = await bcrypt.compare(password, User.password);

  if (!match) {
    error.passwordER = " password mismatch ";
    return error;
  }
  return User;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
