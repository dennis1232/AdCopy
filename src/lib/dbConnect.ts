/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect