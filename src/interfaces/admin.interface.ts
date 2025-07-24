import {Document} from "mongoose";

export interface Iadmin extends Document {
    name: string;
    email: string;
    password: string;
    role: "Admin";
}