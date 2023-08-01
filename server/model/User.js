import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prénom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

export default mongoose.model('User', userSchema);