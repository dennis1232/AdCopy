// src/app/api/scrapeProduct/route.ts

import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

type ProductData = {
    image?: string
    description?: string
    price?: string
    originalPrice?: string
    discount?: string
    starsRating?: string
    numberOfReviews?: string
    numberOfOrders?: string
    shipmentPrice?: string
    shipmentEstimate?: string
    brand?: string
}

export async function POST(req: NextRequest) {
    try {
        const { productUrl } = await req.json()

        // Validate the input
        if (!productUrl || typeof productUrl !== 'string') {
            console.error('Invalid productUrl:', productUrl)
            return NextResponse.json({ error: 'Product URL is required and must be a string.' }, { status: 400 })
        }

        console.log('Starting Puppeteer to scrape:', productUrl)

        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                // '--disable-dev-shm-usage',
                // '--single-process',
                // '--no-zygote',
            ],
            userDataDir: '/tmp/.cache/puppeteer',
        })

        const page = await browser.newPage()
        await page.setViewport({
            width: 1300,
            height: 600,
        })

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)')

        // Navigate to the product page
        console.log('Navigating to the product page...')
        await page.goto(productUrl, { waitUntil: 'domcontentloaded' })

        // Wait for the product title element to load
        console.log('Waiting for the product title element...')
        await page.waitForSelector('div.title--wrap--UUHae_g, div.price--current--I3Zeidd', { timeout: 15000 })

        // Extract product data
        console.log('Extracting product data...')
        const productData: ProductData = await page.evaluate(() => {
            const description = document.querySelector('div.title--wrap--UUHae_g')?.textContent?.trim()
            // const image = document.querySelector('img.magnifier--image--EYYoSlr')?.textContent?.trim()
            const price = document.querySelector('div.price--current--I3Zeidd')?.textContent?.trim()
            const originalPrice = document.querySelector('span.price--originalText--gxVO5_d')?.textContent?.trim()
            const discount = document.querySelector('span.price--discount--Y9uG2LK')?.textContent?.trim()
            const starsRating = document.querySelector('.reviewer--rating--xrWWFzx strong')?.textContent?.trim()
            const numberOfReviews = document.querySelector('a.reviewer--reviews--cx7Zs_V')?.textContent?.trim()
            const numberOfOrders = document.querySelector('span.reviewer--sold--ytPeoEy')?.textContent?.trim()
            const shipmentPrice = document.querySelector('.dynamic-shipping-titleLayout strong')?.textContent?.trim()
            const shipmentEstimate = document
                .querySelector('.dynamic-shipping-contentLayout strong')
                ?.textContent?.trim()
            const brand = document
                .querySelector('.specification--desc--Dxx6W0W span[data-spm-anchor-id]')
                ?.textContent?.trim()

            const images: string[] = []
            document.querySelectorAll('img.magnifier--image--EYYoSlr').forEach((img) => {
                if (img instanceof HTMLImageElement) {
                    images.push(img.src)
                }
            })

            return {
                image: images[0],
                description,
                price,
                originalPrice,
                discount,
                starsRating,
                numberOfOrders,
                numberOfReviews,
                shipmentPrice,
                shipmentEstimate,
                brand,
            }
        })

        // Close Puppeteer
        await browser.close()

        console.log('Scraping successful:', productData)

        // Return the scraped data
        return NextResponse.json(productData)
    } catch (error) {
        console.error('Error scraping product:', error)

        // Provide more detailed error information
        if (error) {
            return NextResponse.json(
                {
                    error: 'Timeout while waiting for page elements. The page might be loading slowly or selectors have changed.',
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to scrape the product. Please ensure the URL is correct and try again.' },
            { status: 500 }
        )
    }
}
