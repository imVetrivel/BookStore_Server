const express = require('express')
const cors = require('cors')
// const users = require('./routes/userRoute')
const projects = require('./routes/projectRoute')
const users = require('./models/userModel')
const app = express()
const dbConn = require('./config/db')

app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    console.log('Received registration request:', req.body); // Log incoming request body
    users.create(req.body)
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error during user creation:', err); // Log the error for debugging
            res.status(500).json({ message: 'User registration failed', error: err.message });
        });
});


app.listen(5000, () => {
    console.log('Server running in : 5000')
})