/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/sendToTelegram/route.ts

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID

export async function POST(req: NextRequest) {
    try {
        const { message, imageUrl } = await req.json()

        // Parse the request body

        // Log the received data for debugging purposes
        console.log('Received data:', { message, imageUrl })

        // Construct the Telegram API URL
        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

        // Prepare the payload for the Telegram API
        const payload = {
            chat_id: TELEGRAM_CHANNEL_ID,
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