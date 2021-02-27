const { HttpCode } = require('../helpers/constans')
const contactServices = require('../services/contact-services')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactServices.listContacts()
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
    const contact = await contactServices.getContactById(req.params)
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
    const contact = await contactServices.addContact(req.body)
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
      const contact = await contactServices.updateContact(req.params, req.body)
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
    const contact = await contactServices.removeContact(req.params)
    console.log('req.params', req.params)
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
