import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    agreedToTermsAndConditions: {
        type: Boolean,
        required: true,
        default: false
    } 
}, {
    timestamps: true
})

// custom middleware to compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// before user record is registered, password is hashed
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    if(this.isModified("email")){
        this.verified = false
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User