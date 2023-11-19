const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User =  require('../models/userModel')


// generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



const signup = asyncHandler( async (req,res) => {
    const {name, email, password} = req.body
    console.log(0);

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Incomplete data!')
    }

    // check if user exsists
    const isUser = await User.findOne({email})
    if (isUser) {
        res.status(400)
        throw new Error('User already exsists!')
    }
    console.log(1);
    // hash the password
    const salt = bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)

    // create a new user profile
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })
    console.log(2);

    if (newUser) {
        console.log(newUser);
        res.status(201).send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else{
        res.send({error: "not created"})
    }
})

const login = asyncHandler( async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(200).json({
            _id: newUser.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found!')
    }
})

const getUser = asyncHandler(async (req,res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


module.exports = {
    signup,
    login,
    getUser
}