const contactsRepository = require('../repository/contacts-repository')

const listContacts = async () => {
  const data = contactsRepository.listContacts()
  return data
}

const getContactById = async (contactId) => {
  const data = contactsRepository.getContactById(contactId)
  return data
}

const removeContact = async (contactId) => {
  const data = contactsRepository.removeContact(contactId)
  return data
}

const addContact = async (body) => {
  const data = contactsRepository.addContact(body)
  return data
}

const updateContact = async (contactId, body) => {
  const data = contactsRepository.updateContact(contactId, body)
  return data
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
