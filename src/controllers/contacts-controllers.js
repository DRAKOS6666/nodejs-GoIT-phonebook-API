const { HttpCode } = require('../helpers/constans')
const ContactsServices = require('../services/contact-services')
const contactsServices = new ContactsServices()

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts()
    res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        contacts,
      }
    })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsServices.getContactById(req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          contact,
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Contact is not found',
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.addContact(req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.CREATED,
        data: {
          contact,
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Contact is not found',
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (name || email || phone) {
      const contact = await contactsServices.updateContact(req.params, req.body)
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: 'succes',
          code: HttpCode.CREATED,
          data: {
            contact,
          }
        })
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: 'Not found',
          data: 'Not Found'
        })
      }
    } next()
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.removeContact(req.params)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OR,
        message: "contact deleted"
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts, getContactById, addContact, updateContact, removeContact
}
