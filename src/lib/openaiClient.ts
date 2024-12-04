/* eslint-disable @typescript-eslint/no-explicit-any */

import { OpenAI } from 'openai'

const openaiApiKey = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables')
}

export const openai = new OpenAI({
    apiKey: openaiApiKey.trim(),
})

export const generateAdCopy = async (messages: any[], maxTokens: number = 400, temperature: number = 0.7) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: maxTokens,
        temperature,
    })
    return completion
}
