import { NextRequest, NextResponse } from 'next/server'
import { ApifyClient } from 'apify-client'

const client = new ApifyClient({
    token: 'apify_api_WrCeq00Lyu6FhARgC95XHzs0DKBn7c1VnqGJ',
})

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const taskId = searchParams.get('taskId')

        if (!taskId) {
            return NextResponse.json({ error: 'taskId is required' }, { status: 400 })
        }

        // Get the task's status
        const run = await client.run(taskId).get()
        if (run) {
            const { status } = run

            if (status === 'SUCCEEDED') {
                // Fetch results from the dataset if the task is complete
                const { items } = await client.dataset(run.defaultDatasetId).listItems()
                return NextResponse.json({ status, data: items })
            }

            // If the task is not complete, return its current status
            return NextResponse.json({ status })
        }
        return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 })
    } catch (error) {
        console.error('Error checking task status:', error)
        return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 })
    }
}
