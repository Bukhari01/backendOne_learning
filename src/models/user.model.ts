import {Schema, model} from "mongoose";
import {Iuser} from "../interfaces/user.interface";


const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    },
}, {timestamps: true});

export const userModel = model<Iuser>("User", userSchema);
