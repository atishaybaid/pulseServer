import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('user', userSchema);


