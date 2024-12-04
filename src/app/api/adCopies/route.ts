import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import AdCopy from '@/models/AdCopy'

export async function GET() {
    try {
        await dbConnect()

        const adCopies = await AdCopy.find().sort({ date: -1 })

        return NextResponse.json(adCopies)
    } catch (error) {
        console.error('Error fetching ad copies:', error)
        return NextResponse.json({ error: 'Failed to fetch ad copies' }, { status: 500 })
    }
}
