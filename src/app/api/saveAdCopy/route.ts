// app/api/generateAdCopy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import AdCopy, { IAdCopy } from '@/models/AdCopy'

export async function POST(req: NextRequest) {
    const { content, imageUrl, adCopyId } = await req.json()

    if (!content) {
        return NextResponse.json({ error: 'Failed to save adCopy' }, { status: 500 })
    }

    try {
        await dbConnect()
        if (adCopyId) {
            const adCopy = AdCopy.findOneAndUpdate({ _id: adCopyId }, { content, imageUrl })
            console.log(adCopy)
            return
        }

        // Save the ad copy to MongoDB
        const newAdCopy: IAdCopy = new AdCopy({
            content,
            imageUrl,
            date: new Date(),
        })

        await newAdCopy.save()

        return NextResponse.json({
            result: content,
            adCopyId: newAdCopy._id,
        })
    } catch (error) {
        console.error('Error generating ad copy:', error)
        return NextResponse.json({ error: 'Failed to generate ad copy' }, { status: 500 })
    }
}
