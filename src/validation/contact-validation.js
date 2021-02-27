const Joi = require('joi')
const { HttpCode } = require('../helpers/constans')

const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  phone: Joi.string()
    .pattern(/[0-9, -+()]/)
    .min(5)
    .max(25)
    .optional()
})

const schemaUpdate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  phone: Joi.string()
    .pattern(/[0-9, -+()]/)
    .min(5)
    .max(25)
    .optional()
})

const schemaGetById = Joi.string().guid({
  version: [
    'uuidv4'],
  separator: true,
}).required()

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Bad Request'
    })
  }
  next()
}

module.exports.create = (req, res, next) => {
  return validate(schemaCreate, req.body, next)
}

module.exports.update = (req, res, next) => {
  return validate(schemaUpdate, req.body, next)
}

module.exports.contatctId = (req, res, next) => {
  const { contactId } = req.params
  return validate(schemaGetById, contactId, next)
}