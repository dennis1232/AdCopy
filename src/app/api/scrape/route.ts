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

    const browser = await puppeteer.launch({
        args: isLocal
            ? puppeteer.defaultArgs()
            : [...chromium.args, '--hide-scrollbars', '--incognito', '--no-sandbox'],
        defaultViewport: { width: 800, height: 600 },
        executablePath: process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
        headless: true,
    })

    const page = await browser.newPage()
    const userAgents = [
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
    ]

    const randomUserAgent = userAgents[0]

    await page.setUserAgent(randomUserAgent)

    await page.goto(productUrl)
    const document = await page.content()

    const $ = cheerio.load(document)

    const description = $('.article-title')?.text().trim()
    const price = $('div.price--current--I3Zeidd')?.text().trim()
    const originalPrice = $('span.price--originalText--gxVO5_d')?.text().trim()
    const discount = $('span.price--discount--Y9uG2LK')?.text().trim()
    const stars = $('.reviewer--rating--xrWWFzx strong')?.text().trim()
    const numberOfReviews = $('a.reviewer--reviews--cx7Zs_V')?.text().trim()
    const numberOfOrders = $('span.reviewer--sold--ytPeoEy')?.text().trim()
    const shipmentPrice = $('.dynamic-shipping-titleLayout strong')?.text().trim()
    const shipmentEstimate = $('.dynamic-shipping-contentLayout strong')?.text().trim()
    const image = $('img.magnifier--image--EYYoSlr').attr('src')

    await browser.close()
    return Response.json({
        image,
        price,
        description,
        originalPrice,
        shipmentEstimate,
        discount,
        shipmentPrice,
        stars,
        numberOfReviews,
        numberOfOrders,
    })
}
