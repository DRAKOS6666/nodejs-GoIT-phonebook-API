const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const adapter = new FileSync(path.join(__dirname, '..', '..', 'data', 'contacts-db.json'))

const db = lowdb(adapter)

db.defaults({ contacts: [] }).write()

module.exports = {
  db,
}
