const path = require('path')

const app = require('../src/app')
const db = require('../src/db')
const createFolderIfNotExist = require('../src/helpers/create-dir')
require('dotenv').config()

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR
    const AVATARS_OF_USERS = path.join(process.cwd(), 'public', process.env.AVATARS_OF_USERS)
    await createFolderIfNotExist(UPLOAD_DIR)
    await createFolderIfNotExist(AVATARS_OF_USERS)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`)
})
