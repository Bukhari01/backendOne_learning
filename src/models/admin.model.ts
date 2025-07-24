import {Schema, model} from "mongoose";
import {Iadmin} from "../interfaces/admin.interface";

const adminSchema = new Schema<Iadmin>({
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
        enum: ["Admin"],
        default: "Admin",
    },
}, {timestamps: true});

export default model<Iadmin>("Admin", adminSchema);
