const contacts = [
    {
        _id: "605120ee8f3d090d48b8be52",
        name: "Ralph Walker",
        email: "Ralph@gmail.com",
        phone: "(555) 999-0000",
        owner: "6047c2301c8bc313540c90ba"
    },
    {
        _id: "6053c901ab22751d7488a81c",
        name: "Joe Kicker",
        email: "Joe.kicker@gmail.com",
        phone: "(666) 666-3333",
        owner: "6061f38907d4e309fcf1cc8b"
    }
]

const newContact = {
    name: "Sophia Grey",
    email: "Sophia@gmail.com",
    phone: "(555) 999-0000",
}

const User = {
    _id: "6061f38907d4e309fcf1cc8b",
    subscription: "free",
    avatar: "6061f38907d4e309fcf1cc8b\\1617032129372-5f62d2.png",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjFmMzg5MDdkNGUzMDlmY2YxY2M4YiIsImlhdCI6MTYxNzAzMjExMiwiZXhwIjoxNjE3MDM5MzEyfQ.4Oba7jZjEpCjpqHg7yg31SyeOr02sQ9seSdnQSpWDt0",
    username: "Drakos",
    email: "drakostius2@gmail.com",
    password: "QdZL3zJqrupHltbXqmPb1e1N3Ay7TAqPeDvaorx0Yufjg9hbiO1Gq",
    avatarUrl: "https://s.gravatar.com/avatar/1672901fc82f82c53ff4a4d2d9b80bd5?size=200",
}

const users = []
users[0] = User

const newUser = { email: "Zina@gmail.com", username: "Zina", password: "12345" }

module.exports = {
    contacts,
    newContact,
    User,
    users,
    newUser
}