let Validator = require("validator");
let isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = '"job title" field required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = '"company" field required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = '"from" date field required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
