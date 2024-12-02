import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
import { NextRequest } from 'next/server'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

export async function POST(req: NextRequest) {
    const isLocal = process.env.CHROME_EXECUTABLE_PATH
    const { productUrl } = await req.json()

    const browser = await puppeteer.launch({
        args: isLocal
            ? puppeteer.defaultArgs()
            : [...chromium.args, '--hide-scrollbars', '--incognito', '--no-sandbox'],
        defaultViewport: chromium.defaultViewport,
        executablePath:
            process.env.CHROME_EXECUTABLE_PATH ||
            (await chromium.executablePath(
                'https://scrape-ads.s3.eu-north-1.amazonaws.com/chromium-v126.0.0-pack.tar'
            )),
        headless: chromium.headless,
    })

    const page = await browser.newPage()
    await page.goto(productUrl)
    const pageTitle = await page.title()
    await browser.close()
    return Response.json({ pageTitle })
}
