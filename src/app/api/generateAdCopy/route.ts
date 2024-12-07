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
                    'You are an AI assistant specializing in creating engaging and visually structured ad copy for e-commerce products. Follow these steps to create professional and impactful ads:',
            },
            {
                role: 'system',
                content:
                    '1. **Headline**: Begin the ad with a catchy, engaging headline that includes relevant emojis and the product name.',
            },
            {
                role: 'system',
                content:
                    '2. **Key Features**: Highlight 3-4 key features of the product. Prefix each feature with a unique emoji to make it visually appealing.',
            },
            {
                role: 'system',
                content:
                    "3. **Pricing Details**: If a discount exists, show the discounted price, original price, and percentage discount in an eye-catching format. Example: 🤑 'מחיר מבצע: ₪50.00 (במקום ₪75.00 - 33% הנחה!)'",
            },
            {
                role: 'system',
                content:
                    '4. **Social Proof**: Highlight social proof such as the number of reviews, average rating, and total sales.',
            },
            {
                role: 'system',
                content:
                    '5. **Shipping Information**: Include details such as shipping cost (free or paid) and estimated delivery time.',
            },
            {
                role: 'system',
                content:
                    '6. **Call-to-Action (CTA)**: End with a clear and actionable CTA, including the purchase link, using engaging language.',
            },
            {
                role: 'system',
                content:
                    'Formatting Requirements: Use RTL (right-to-left) formatting for Hebrew text. Ensure placeholders like product name, price, and features are dynamically populated based on the provided input. Keep the tone conversational and visually appealing.',
            },
            {
                role: 'user',
                content: adPrompt,
            },
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
