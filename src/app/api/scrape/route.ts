import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
import { NextRequest } from 'next/server'
import * as cheerio from 'cheerio'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

export async function POST(req: NextRequest) {
    await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf')
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH
    const { productUrl } = await req.json()

    if (!productUrl || !productUrl.startsWith('http')) {
        return Response.json({ error: 'Invalid or missing productUrl' }, { status: 400 })
    }

    const browser = await puppeteer.launch({
        args: isLocal
            ? puppeteer.defaultArgs()
            : [...chromium.args, '--hide-scrollbars', '--incognito', '--no-sandbox'],
        defaultViewport: { width: 800, height: 600 },
        executablePath:
            process.env.CHROME_EXECUTABLE_PATH ||
            (await chromium.executablePath(
                'https://scrape-ads.s3.eu-north-1.amazonaws.com/chromium-v122.0.0-pack.tar'
            )),
        headless: true,
    })

    const page = await browser.newPage()
    await page.setUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    )

    await page.goto(productUrl)
    const document = await page.content()
    const $ = cheerio.load(document)
    const price = $('div.price--current--I3Zeidd')?.text().trim()
    const originalPrice = $('span.price--originalText--gxVO5_d')?.text().trim()
    const discount = $('span.price--discount--Y9uG2LK')?.text().trim()
    const starsRating = $('.reviewer--rating--xrWWFzx strong')?.text().trim()
    const numberOfReviews = $('a.reviewer--reviews--cx7Zs_V')?.text().trim()
    const numberOfOrders = $('span.reviewer--sold--ytPeoEy')?.text().trim()
    const shipmentPrice = $('.dynamic-shipping-titleLayout strong')?.text().trim()

    await browser.close()
    return Response.json({
        price,
        originalPrice,
        discount,
        shipmentPrice,
        starsRating,
        numberOfReviews,
        numberOfOrders,
    })
}
