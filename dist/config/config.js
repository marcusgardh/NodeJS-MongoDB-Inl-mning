'use strict';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var mongoDB = {
    databaseURL: process.env.MONGO_ATLAS_URL
};

module.exports = { mongoDB: mongoDB };