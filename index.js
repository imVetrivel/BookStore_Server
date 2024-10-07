const express = require('express')
const cors = require('cors')
const users = require('./routes/userRoute')
const projects = require('./routes/projectRoute')
const app = express()
const dbConn = require('./config/db')

app.use(express.json())
app.use(cors())


app.use('/user',users);
// app.use('/projects',projects);

app.listen(5000, () => {
    console.log('Server running in : 5000')
})