const express = require('express')
const contactsControllers = require('../../controllers/contacts-controllers')
const contactValidation = require('../../validation/contact-validation')

const contactsRouter = express.Router()
contactsRouter
  .get('/', contactsControllers.listContacts)
  .get('/:contactId', contactValidation.contatctId, contactsControllers.getContactById)
  .post('/', contactValidation.create, contactsControllers.addContact)
  .patch('/:contactId', contactValidation.update, contactsControllers.updateContact)
  .delete('/:contactId', contactValidation.contatctId, contactsControllers.removeContact)

module.exports = { contactsRouter }
