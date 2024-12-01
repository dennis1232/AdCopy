import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    await dbConnect()

    const user = await User.findOneAndUpdate({ email: session?.user?.email }, { name }, { new: true })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Profile updated successfully', user })
}
