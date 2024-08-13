const validator = require("validator");

const validate = (params) => {
  let name =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: undefined }) &&
    validator.isAlpha(params.name, "es-ES");

  let surname =
    !validator.isEmpty(params.surname) &&
    validator.isLength(params.surname, { min: 3, max: undefined }) &&
    validator.isAlpha(params.surname, "es-ES");
  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: undefined });

  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);

  let password = !validator.isEmpty(params.password);

  if (params.bio) {
    let bio = validator.isLength(params.nick, { min: undefined, max: 255 });
  } else {
    if (!bio) {
      throw new Error("No se ha superado la validacion");
    } else {
      console.log("Validacion superada");
    }
  }

  if (!name || !surname || !nick || !password || !email) {
    throw new Error("No se ha superado la validacion");
  } else {
    console.log("Validacion superada");
  }
};
module.exports = { validate };
