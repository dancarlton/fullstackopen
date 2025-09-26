require('dotenv').config()

const PORT = process.env.PORT

const MONGO_URI = process.env.MONGO_URI === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI

module.exports = { MONGO_URI, PORT }
