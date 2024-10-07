const express = require('express')
const router = express.Router();
const users = require('../models/userModel')

router.post('/register', async (req,res) => {
	try {
		const {name,email,password} = req.body
		const finduser = await users.findOne({email:email})
		if(finduser!==null){
			return res.status(400).json({message:"Email Already exists"})
		}
		if(!name || !email || !password){
			return res.status(400).json({message:"All fields are required"})
		}
		const newuserdata = new users(req.body)
		const savedata = await newuserdata.save()
		res.status(200).json(savedata)
	} catch (error) {
		console.log(error)
		res.status(500).json({message:"Internal server error"})
	}
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Successful login
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router