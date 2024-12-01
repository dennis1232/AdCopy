import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import AdCopy from '@/models/AdCopy'

export async function POST(req: NextRequest) {
    const { adCopyId } = await req.json()
    try {
        await dbConnect()
        await AdCopy.findByIdAndDelete(adCopyId)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error fetching ad copies:', error)
        return NextResponse.json({ error: 'Failed to fetch ad copies' }, { status: 500 })
    }
}
