import { NextRequest, NextResponse } from 'next/server'
import { adTemplateMap, BotChannelVariant } from '@/lib/adTemplates'
import { generateAdCopy } from '@/lib/openaiClient'
import { FormData } from '@/types'

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const { formData } = await req.json()
        const botChannel = formData.category as BotChannelVariant

        // Validate the category
        if (!adTemplateMap[botChannel]) {
            return NextResponse.json({ error: 'Invalid channel category' }, { status: 400 })
        }

        // Generate the prompt using the template map
        const adPrompt = adTemplateMap[botChannel].generatePrompt(formData as FormData)

        // Define the OpenAI messages for ad generation
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
                    "3. Provide the discounted price, original price, and percentage discount in a visually appealing way, e.g., 🤑 'מחיר מבצע: ₪50.00 (במקום ₪75.00 - 33% הנחה!)' only if there is discount.",
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

        // Call the OpenAI API to generate ad copy
        const completion = await generateAdCopy(messages)

        // Extract the generated ad copy content
        const adCopyContent = completion.choices?.[0]?.message?.content

        // Handle cases where the API response is invalid
        if (!adCopyContent) {
            console.error('OpenAI API returned no content:', completion)
            return NextResponse.json({ error: 'Failed to generate ad copy' }, { status: 500 })
        }

        // Return the generated ad copy as a response
        return NextResponse.json({
            result: adCopyContent,
        })
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error generating ad copy:', error)

        // Respond with a generic error message
        return NextResponse.json({ error: 'An unexpected error occurred while generating ad copy' }, { status: 500 })
    }
}
