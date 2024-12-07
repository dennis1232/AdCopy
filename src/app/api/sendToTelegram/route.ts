/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/sendToTelegram/route.ts

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { BotChannelVariant } from '@/lib/adTemplates'

interface BotChannelConfig {
    botToken: string | undefined // Tokens are read from environment variables and can be undefined
    channelId: string | undefined // Same as above
}

const botChannelMap: Record<BotChannelVariant, BotChannelConfig> = {
    tennis: {
        botToken: process.env.TELEGRAM_TENNIS_BOT_TOKEN,
        channelId: process.env.TELEGRAM_TENNIS_CHANNEL_ID,
    },
    wedding: {
        botToken: process.env.TELEGRAM_WEDDING_BOT_TOKEN,
        channelId: process.env.TELEGRAM_WEDDING_CHANNEL_ID,
    },
    guitarParts: {
        botToken: process.env.TELEGRAM_WEDDING_BOT_TOKEN,
        channelId: process.env.TELEGRAM_WEDDING_CHANNEL_ID,
    },
    favors: {
        botToken: process.env.TELEGRAM_WEDDING_BOT_TOKEN,
        channelId: process.env.TELEGRAM_WEDDING_CHANNEL_ID,
    },
}

export async function POST(req: NextRequest) {
    try {
        const { message, imageUrl, channel } = await req.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        // Get bot token and channel ID based on the variant
        const config = botChannelMap[channel as BotChannelVariant]

        if (!config.botToken || !config.channelId) {
            return NextResponse.json({ error: 'Invalid configuration for the selected variant' }, { status: 500 })
        }

        // Construct the Telegram API URL
        const apiUrl = `https://api.telegram.org/bot${config.botToken}`

        // Prepare the payload for the Telegram API
        const payload = {
            chat_id: config.channelId,
            photo: imageUrl,
            caption: message,
            parse_mode: 'HTML', // Since you're using HTML formatting in your message
        }

        // Send a POST request to the Telegram API to send the photo and caption
        const telegramResponse = await axios.post(`${apiUrl}/sendPhoto`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Check if the Telegram API responded with an error
        if (!telegramResponse.data.ok) {
            throw new Error(telegramResponse.data.description)
        }

        // Return a success response
        return NextResponse.json({ success: true })
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error('Error sending to Telegram:', error.response?.data || error.message)

        // Return an error response with appropriate status code
        return NextResponse.json({ error: 'Failed to send message to Telegram' }, { status: 500 })
    }
}
