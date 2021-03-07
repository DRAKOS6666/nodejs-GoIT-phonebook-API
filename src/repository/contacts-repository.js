const ContactsSchema = require('../schema/contacts-schema')

class ContactsRepository {
  constructor() {
    this.model = ContactsSchema
  }

  async listContacts() {
    const results = await this.model.find({})
    return results
  }

  async getContactById({ contactId }) {
    const result = await this.model.findOne({ _id: contactId })
    return result
  }

  async removeContact({ contactId }) {
    const result = await this.model.findByIdAndDelete({ _id: contactId })
    return result
  }

  async addContact(body) {
    const result = await this.model.create(body)
    return result
  }

  async updateContact({ contactId }, body) {
    const result = await this.model.findByIdAndUpdate({ _id: contactId },
      { ...body },
      { new: true })
    return result
  }
}

module.exports = ContactsRepository
