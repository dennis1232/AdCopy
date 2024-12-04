// app/api/generateAdCopy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { adTemplateMap, BotChannelVariant } from '@/lib/adTemplates'
import { generateAdCopy } from '@/lib/openaiClient'
import { FormData } from '@/types'

export async function POST(req: NextRequest) {
    try {
        const { formData, channel } = await req.json()
        const botChannel = channel as BotChannelVariant

        if (!adTemplateMap[botChannel]) {
            return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })
        }

        const adPrompt = adTemplateMap[botChannel].generatePrompt(formData as FormData)

        const messages = [
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
        ]

        const completion = await generateAdCopy(messages)

        const adCopyContent = completion.choices[0]?.message?.content

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
