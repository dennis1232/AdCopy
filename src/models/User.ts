// models/User.ts

import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    name?: string
    email: string
    password?: string
    image?: string
    emailVerified?: Date
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String },
        emailVerified: { type: Date },
    },
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
