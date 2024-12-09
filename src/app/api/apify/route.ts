import { NextRequest, NextResponse } from 'next/server'
import { ApifyClient } from 'apify-client'

const client = new ApifyClient({
    token: 'apify_api_WrCeq00Lyu6FhARgC95XHzs0DKBn7c1VnqGJ',
})

export async function POST(req: NextRequest) {
    try {
        const { productUrl } = await req.json()
        if (!productUrl) {
            return NextResponse.json({ error: 'productUrl is required' }, { status: 400 })
        }

        // Initialize the ApifyClient and start the task
        const run = await client.task('hwAsFVZAaqFWvGZuG').call({
            startUrls: [{ url: productUrl }],
        })

        // Return the taskId to the client for polling
        return NextResponse.json({ taskId: run.id })
    } catch (error) {
        console.error('Error starting task:', error)
        return NextResponse.json({ error: 'Failed to start task' }, { status: 500 })
    }
}
