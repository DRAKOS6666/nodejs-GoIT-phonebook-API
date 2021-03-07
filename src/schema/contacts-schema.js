const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [2, 'Min length name is 2 signs'],
    maxLength: [75, 'Max length name is 75 signs'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    minLength: [6, 'Minimal length 6 signs'],
    maxLength: [20, 'Maximum length 20 signs']

  }
}, { versionKey: false, timestamps: true })

const ContactsSchema = mongoose.model('contact', contactSchema)

module.exports = ContactsSchema
