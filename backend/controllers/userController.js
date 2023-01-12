import axios from "axios"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import { destroy, read, write } from "../services/datastore.js"
import generateString from "../utils/generateString.js"
import generateToken from "../utils/generateToken.js"

export const authUser =  asyncHandler(async(req, res)=>{
    const { email, password } = req.body

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


export const registerUser =  asyncHandler(async(req, res)=>{
    const { email, password, name, terms } = req.body

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User with the given email address already exists.')
    }

    const newUser = await User.create({
        name,
        email,
        password,
        agreedToTermsAndConditions: terms
    })
    if(newUser){
        const data = {
            created: Date.now(),
            token: generateString(),
            userId: JSON.stringify(newUser._id)
        }
        await write("emailconfirmation", data, JSON.stringify(newUser._id))
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})



export const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)
    
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            verified: user.verified
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


export const sendEmailVerificationLink = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if(user){
            const token = generateString()
            const data = {
                created: Date.now(),
                token,
                userId: JSON.stringify(user._id)
            }
            await write("emailconfirmation", data, JSON.stringify(user._id))

            const reqBody = {
                recipientsObj: {
                    from: "helloprotechgear@gmail.com",
                    to: user.email,
                    cc: "",
                    bcc: ""
                },
                messageObj: {
                    header: "Welcome to ProTechGear",
                    body: `Please click the following link to verify your email address - https://protechgear.herokuapp.com/verifyToken?token=${token}`,
                    footer: "Kind regards <br>ProTechGear"
                }
            }

            
            await axios.post(`https://protechgear.lm.r.appspot.com/sendmail?auth=${process.env.auth}`, reqBody)
            console.log(`EMAIL SENT TO ${user.email}`)

            res.status(200).send("success")
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (error) {
        throw error
    }
})


export const verifyEmailToken = asyncHandler(async(req, res) => {
    const token = req.query.token

    try {
        const result = await read("emailconfirmation" , token)
        if(result.length){
            await User.findByIdAndUpdate(JSON.parse(result[0].userId), {verified: true})
            await destroy("emailconfirmation", result[0].userId)
            res.status(200).json({message: "Your email has been verified!"})
        } else {
            res.status(404)
            throw new Error('Token not found')
        }
    } catch (error) {
        throw error
    }
    
})

export const updateUserProfile = asyncHandler( async(req, res)=>{
    const user = await User.findById(req.user._id)
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
} )


// @desc:   Get list of users for Admin
// @route:  GET /api/users
// @access: Private && Admin
export const getUsersList = asyncHandler(async(req, res)=>{
    const users = await User.find({}, {password: 0})
    res.json(users)
})


// @desc:   Delete user
// @route:  DELETE /api/users/:userId
// @access: Private && Admin
export const deleteUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.userId)
    if(user){
        await user.remove()
        res.json({message: 'Account has been deleted!'})
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc:   Get user by Id
// @route:  GET /api/users/:userId
// @access: Private && Admin
export const getUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.userId).select('-password')
    if(user){
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc:   Update user by Id
// @route:  PUT /api/users/:userId
// @access: Private && Admin
export const updateUserById = asyncHandler( async(req, res)=>{
    const user = await User.findById(req.params.userId)
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
} )