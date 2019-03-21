let Validator = require("validator");
let isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = '"school" field required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = '"degree" field required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = '"field of study" field required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = '"from" date field required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
