async function startScraping(productUrl: string) {
    const response = await fetch('/api/apify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productUrl }),
    })

    const { taskId } = await response.json()
    return taskId
}

async function pollForResults(taskId: string, interval = 10000) {
    return new Promise((resolve, reject) => {
        const poll = async () => {
            try {
                const response = await fetch(`/api/checkScrape?taskId=${taskId}`)
                const { status, data } = await response.json()

                if (status === 'SUCCEEDED') {
                    resolve(data)
                } else if (status === 'FAILED') {
                    reject(new Error('Task failed'))
                } else {
                    setTimeout(poll, interval)
                }
            } catch (error) {
                reject(error)
            }
        }

        poll()
    })
}

// Usage
export async function handleScraping(productUrl: string) {
    try {
        const taskId = await startScraping(productUrl)
        console.log('Task started:', taskId)

        const results = await pollForResults(taskId)
        console.log('Scraping completed:', results)

        return results
    } catch (error) {
        console.error('Error during scraping:', error)
        alert('An error occurred. Check the console for details.')
    }
}
