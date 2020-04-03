if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const mongoDB = {
    databaseURL: process.env.MONGO_ATLAS_URL
}

module.exports = {mongoDB}