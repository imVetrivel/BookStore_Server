const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Users')

const connection = mongoose.connection;
connection.on('connected', () => console.log("DB Connected"))
connection.on('error', () => console.log("DB Error"))

module.exports = mongoose