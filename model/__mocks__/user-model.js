const bcrypt = require('bcryptjs')
const { users } = require('./data')

const findByEmail = jest.fn(
    (email) => {
        const [user] = users.filter(el => String(el.email) === String(email))
        return user
    }
)

const findById = jest.fn(
    (id) => {
        const [user] = users.filter(el => String(el._id) === String(id))
        return user
    }
)

const create = jest.fn(
    ({ username, email, password, subscription = 'free' }) => {
        const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        const newUser = {
            username,
            email,
            password: pass,
            subscription,
            _id: "6061f38907d4e309fcf1cc8c",
            validPassword: function (pass) {
                return bcrypt.compareSync(pass, this.password)
            }
        }
        users.push(newUser)
        return newUser
    }
)

const updateToken = jest.fn(
    (id, token) => {
        return {}
    }
)

const changeSubsc = jest.fn(
    (id, subscription) => {
        return UserSchema.updateOne({ _id: id }, { subscription })
    }
)

const updateAvatar = jest.fn(
    (id, avatar) => {
        return {}
    }
)

module.exports = {
    findByEmail,
    findById,
    updateToken,
    create,
    changeSubsc,
    updateAvatar
}
