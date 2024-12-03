import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { BotChannelVariant } from '../sendToTelegram/route'
import { FormData } from '@/app/form/page'

interface AdTemplateConfig {
    generatePrompt: (formData: FormData) => string
}

const adTemplateMap: Record<BotChannelVariant, AdTemplateConfig> = {
    tennis: {
        generatePrompt: (formData: FormData) => `
            Create an engaging ad copy for the following product in Hebrew, using HTML format, and include an HTML <a> tag for the affiliate link.
            Telegram supports a limited set of HTML tags: <b>, <strong>, <i>, <em>, <u>, <ins>, <s>, <strike>, <del>, <a>, <code>, <pre>.
            No ul or li tags; HTML tags before the allowed set are not needed.
            Brand: ${formData.brand}
            Description: ${formData.description}
            Price: ${formData.price}
            Original Price: ${formData.originalPrice}
            Discount: ${formData.discount}
            Rating: ${formData.stars} stars from ${formData.numberOfReviews} reviews
            Number of Orders: ${formData.numberOfOrders}
            Shipping: ${formData.shipmentPrice}, Estimated Delivery: ${formData.shipmentEstimate}
            Affiliate Link: ${formData.affiliateLink}
            
            The ad copy should end with a call-to-action containing the affiliate link, using an HTML <a href="${formData.affiliateLink}"> ${formData.affiliateLink} </a>.
            📲 הצטרפו לערוץ הטלגרם שלנו למבצעים חמים בטניס - https://t.me/+YSjL72WwEGlkNzk0
            The links should be visible.
        `,
    },
    wedding: {
        generatePrompt: (formData: FormData) => `
            Create an elegant and captivating ad copy for the following wedding accessory in Hebrew, using HTML format, and include an HTML <a> tag for the affiliate link.
            Telegram supports a limited set of HTML tags: <b>, <strong>, <i>, <em>, <u>, <ins>, <s>, <strike>, <del>, <a>, <code>, <pre>.
            No ul or li tags; HTML tags before the allowed set are not needed.
            Brand: ${formData.brand}
            Description: ${formData.description}
            Price: ${formData.price}
            Original Price: ${formData.originalPrice}
            Discount: ${formData.discount}
            Rating: ${formData.stars} stars from ${formData.numberOfReviews} reviews
            Number of Orders: ${formData.numberOfOrders}
            Shipping: ${formData.shipmentPrice}, Estimated Delivery: ${formData.shipmentEstimate}
            Affiliate Link: ${formData.affiliateLink}
            
            The ad copy should end with a call-to-action containing the affiliate link, using an HTML <a href="${formData.affiliateLink}"> ${formData.affiliateLink} </a>.
            📲 הצטרפו לערוץ הטלגרם שלנו למבצעים מיוחדים לחתונות - https://t.me/KALAKLILA            The links should be visible.
        `,
    },
    test: {
        generatePrompt: (formData: FormData) => `
            Create an elegant and captivating ad copy for the following wedding accessory in Hebrew, using HTML format, and include an HTML <a> tag for the affiliate link.
            Telegram supports a limited set of HTML tags: <b>, <strong>, <i>, <em>, <u>, <ins>, <s>, <strike>, <del>, <a>, <code>, <pre>.
            No ul or li tags; HTML tags before the allowed set are not needed.
            Brand: ${formData.brand}
            Description: ${formData.description}
            Price: ${formData.price}
            Original Price: ${formData.originalPrice}
            Discount: ${formData.discount}
            Rating: ${formData.stars} stars from ${formData.numberOfReviews} reviews
            Number of Orders: ${formData.numberOfOrders}
            Shipping: ${formData.shipmentPrice}, Estimated Delivery: ${formData.shipmentEstimate}
            Affiliate Link: ${formData.affiliateLink}
            
            The ad copy should end with a call-to-action containing the affiliate link, using an HTML <a href="${formData.affiliateLink}"> ${formData.affiliateLink} </a>.
            📲 הצטרפו לערוץ הטלגרם שלנו למבצעים מיוחדים לחתונות - https://t.me/+YSjL72WwEGlkNzk0
            The links should be visible.
        `,
    },
}

export async function POST(req: NextRequest) {
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 400 })
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY.trim(),
    })
    const { formData, channel } = await req.json()
    const adPrompt = adTemplateMap[channel as BotChannelVariant].generatePrompt(formData)
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an assistant specialized in creating engaging and visually structured ad copy for e-commerce products. Follow these steps strictly for each request:',
                },
                {
                    role: 'system',
                    content:
                        '1. Begin the ad with a catchy and engaging headline that includes relevant emojis. Use the product name in the headline.',
                },
                {
                    role: 'system',
                    content:
                        '2. Include 3-4 key features of the product, each prefixed with an emoji to make it visually appealing.',
                },
                {
                    role: 'system',
                    content:
                        "3. Provide the discounted price, original price, and percentage discount in a visually appealing way, e.g., 🤑 'מחיר מבצע: ₪50.00 (במקום ₪75.00 - 33% הנחה!)' only if there is discount",
                },
                {
                    role: 'system',
                    content:
                        '4. Highlight social proof by including details such as the number of reviews, average rating, and total sales.',
                },
                {
                    role: 'system',
                    content:
                        '5. Mention the shipping details, such as whether shipping is free and the estimated delivery date.',
                },
                {
                    role: 'system',
                    content: '6. End with a clear and actionable call-to-action (CTA) that includes the purchase link.',
                },
                {
                    role: 'system',
                    content:
                        'Use right-to-left (RTL) formatting for the ad copy and keep the tone engaging and conversational.',
                },
                {
                    role: 'system',
                    content:
                        'Ensure all placeholders like product name, price, and features are dynamically populated from the input provided.',
                },
                { role: 'user', content: adPrompt },
            ],
            max_tokens: 400,
            temperature: 0.7,
        })
        const adCopyContent = completion.choices[0].message.content

        if (!adCopyContent) {
            return NextResponse.json({ error: 'Failed to generate ad copy' }, { status: 500 })
        }

        return NextResponse.json({
            result: adCopyContent,
        })
    } catch (error) {
        console.error('Error generating ad copy:', error)
        return NextResponse.json({ error: 'Failed to generate ad copy' }, { status: 500 })
    }
}
