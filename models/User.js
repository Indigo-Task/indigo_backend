import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    recepientToken: {
        type: String,
        unique: true,
    },
    contact : {
        type: String,
        required: true,
    },
    flightId: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    notification: [{
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);

export default User;