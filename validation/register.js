let Validator = require("validator");
let isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "name must be from 4 to 30 characters in length";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = '"name" field required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '"email" field required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '"password" field required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at least 6 characters in length";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = '"confirm password" field required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
