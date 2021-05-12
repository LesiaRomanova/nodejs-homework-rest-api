const Joi = require("joi");

const validateSchemaCreateContact = Joi.object({
  name: Joi.string()

    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string().min(7).max(9).optional(),
});

const validateSchemaUpdateContact = Joi.object({
  name: Joi.string()

    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string().min(7).max(9).optional(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")}`,
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateSchemaCreateContact = (req, res, next) => {
  return validate(validateSchemaCreateContact, req.body, next);
};

module.exports.validateSchemaUpdateContact = (req, res, next) => {
  return validate(validateSchemaUpdateContact, req.body, next);
};
