const express = require('express')
const router = express.Router();
const users = require('../models/userModel')
const bcrypt = require('bcrypt');

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
		
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUserData = new users({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUserData.save();
		res.status(200).json(savedUser)

	} catch (error) {
		console.log(error)
		res.status(500).json({message:"Internal server error"})
	}
})

router.post('/signin', async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Log the incoming request body
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const finduser = await users.findOne({ email: email });

        // Check if user exists
        if (!finduser) {
            return res.status(400).json({ message: "No Email Exists Please Signup or check email" });
        }

        const isPasswordValid = await bcrypt.compare(password, finduser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user: finduser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put('/addcart', async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const updatedUser = await users.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { cart_items: bookId } },
            { new: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});



router.get('/getcart/:userid',async(req,res) => {
    try {
        const {userid} = req.params;
        const user = await users.findById(userid).select('cart_items');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({cart_items:user.cart_items});
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
})









module.exports = router