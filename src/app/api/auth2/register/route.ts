// app/api/auth/register/route.ts

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request: Request) {
    try {
        // Connect to the database
        await dbConnect()

        // Parse the request body
        const { name, email, password } = await request.json()

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 422 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        // Save the user to the database
        await newUser.save()

        // Respond with a success message
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        console.error('Error registering user:', error)
        return NextResponse.json({ error: 'An error occurred while registering the user' }, { status: 500 })
    }
}
