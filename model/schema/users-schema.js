const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bCrypt = require('bcryptjs')

const { Subscription } = require('../../src/helpers/constans')
const upload = require('../../src/helpers/upload')

const saltFactor = Number(process.env.SALT_WORK_FACTOR)

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
    default: Subscription.FREE
  },
  avatar: {
    type: String,
    default: null
  },
  avatarUrl: {
    type: String,
    default: function () {
      const avatar = gravatar.url(this.email, { size: 200 }, true)
      upload.single('avatar')
      return avatar
    }
  },
  token: {
    type: String,
    default: null
  }
}, { versionKey: false, timestamps: true })
// }
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bCrypt.genSalt(saltFactor)
  this.password = await bCrypt.hash(this.password, salt, null)
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password)
}

userSchema.path('email').validate(function (value) {
  const re = /\S+@\S+\.\S+/
  return re.test(String(value).toLowerCase())
})

const UserSchema = model('user', userSchema)

module.exports = UserSchema
