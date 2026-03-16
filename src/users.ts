import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

const User = mongoose.model('Users', userSchema)

export {User}