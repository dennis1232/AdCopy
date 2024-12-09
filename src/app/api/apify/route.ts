import chromium from '@sparticuz/chromium-min'
import { NextRequest } from 'next/server'
import { ApifyClient } from 'apify-client'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

const client = new ApifyClient({
    token: 'apify_api_WrCeq00Lyu6FhARgC95XHzs0DKBn7c1VnqGJ',
})

export async function POST(req: NextRequest) {
    const { productUrl } = await req.json()
    if (!productUrl) return
    // Initialize the ApifyClient with API token

    // Run the Actor task and wait for it to finish
    const run = await client.task('hwAsFVZAaqFWvGZuG').call({
        startUrls: [{ url: productUrl }],
    })

    // Fetch and print Actor task results from the run's dataset (if any)
    console.log('Results from dataset')
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    items.forEach((item) => {
        console.dir(item)
    })

    return Response.json({
        ...items['0'],
    })
}
