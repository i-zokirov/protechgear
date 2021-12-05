import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
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
    const { email, password, name } = req.body

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User with the given email address already exists.')
    }

    const newUser = await User.create({
        name,
        email,
        password
    })
    if(newUser){
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
        })
    } else {
        res.status(404)
        throw new Error('User not found')
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


