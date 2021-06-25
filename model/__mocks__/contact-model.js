const { contacts } = require('./data')


const listContacts = jest.fn(
    (userId, query) => {
        // const { limit = 20, offset = 0, page = 1, sortBy, sortByDesc, sub } = query
        return {
            contacts, total: contacts.length,
            // limit, offset
        }
    }
)


const getContactById = jest.fn(
    ({ contactId }, userId) => {
        const [result] = contacts.filter(el => String(el._id) === String(contactId)
            // && String(el.owner) === String(userId)
        )
        return result
    }
)

const removeContact = jest.fn(
    ({ contactId }, userId) => {
        const index = contacts.findIndex(el => String(el._id) === String(contactId)
            //  && String(el.owner) === String(userId)
        )
        if (index === -1) {
            return null
        }
        const [contact] = contacts.splice(index, 1)
        return contact
    }
)

const addContact = jest.fn(
    (body, userId) => {
        const newContact = { ...body, _id: '605120ee8f3d090d48b8be5a' }
        contacts.push(newContact)
        return newContact
    }
)

const updateContact = jest.fn(
    ({ contactId }, body, userId) => {
        let [result] = contacts.filter(el => String(el._id) === String(contactId)
            // && String(el.owner) === String(userId)
        )
        if (result) {
            result = { ...result, ...body }
        }
        return result
    }
)

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
