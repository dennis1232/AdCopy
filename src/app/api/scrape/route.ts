import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
import { NextRequest } from 'next/server'
import * as cheerio from 'cheerio'

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

export async function POST(req: NextRequest) {
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH
    const { productUrl } = await req.json()

    if (!productUrl || !productUrl.startsWith('http')) {
        return Response.json({ error: 'Invalid or missing productUrl' }, { status: 400 })
    }
    console.log(
        'Chromium Path:',
        process.env.CHROME_EXECUTABLE_PATH ||
            (await chromium.executablePath('https://scrape-ads.s3.eu-north-1.amazonaws.com/chromium-v126.0.0-pack.tar'))
    )

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
    // page.waitForSelector('div.title--wrap--UUHae_g', { timeout: 15000 })
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
