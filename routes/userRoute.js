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

module.exports = router