import { FormData } from '@/types'

export type BotChannelVariant = 'tennis' | 'wedding' | 'guitarParts' | 'favors'

interface ChannelConfig {
    label: string
    telegramLink: string
}

export const channelSelectionMap: Record<BotChannelVariant, ChannelConfig> = {
    tennis: {
        label: 'Tennis Deals',
        telegramLink: 'https://t.me/+YSjL72WwEGlkNzk0',
    },
    wedding: {
        label: 'Wedding Accessories',
        telegramLink: 'https://t.me/KALAKLILA',
    },
    guitarParts: {
        label: 'Guitar Parts & Accessories',
        telegramLink: 'https://t.me/GuitarPartsDeals',
    },
    favors: {
        label: 'Favors & Gifts',
        telegramLink: 'https://t.me/FavorsAndGifts',
    },
}

interface AdTemplateConfig {
    generatePrompt: (formData: FormData) => string
}

const generateAdTemplate = (formData: FormData, callToAction: string, telegramLink: string): string => `
    Create an engaging and captivating ad copy in Hebrew for the following product, using HTML format without html start, and include an HTML <a> tag for the affiliate link.
    Telegram supports a limited set of HTML tags: <b>, <strong>, <i>, <em>, <u>, <ins>, <s>, <strike>, <del>, <a>, <code>, <pre>.
    No ul or li tags; HTML tags outside this allowed set are not needed.
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
    📲 ${callToAction} - ${telegramLink}
    The links should be visible.
`

export const adTemplateMap: Record<BotChannelVariant, AdTemplateConfig> = {
    tennis: {
        generatePrompt: (formData: FormData) =>
            generateAdTemplate(
                formData,
                `הצטרפו לערוץ הטלגרם שלנו למבצעים חמים בטניס`,
                channelSelectionMap['tennis'].telegramLink
            ),
    },
    wedding: {
        generatePrompt: (formData: FormData) =>
            generateAdTemplate(
                formData,
                `הצטרפו לערוץ הטלגרם שלנו למבצעים מיוחדים לחתונות`,
                channelSelectionMap['wedding'].telegramLink
            ),
    },
    guitarParts: {
        generatePrompt: (formData: FormData) =>
            generateAdTemplate(
                formData,
                `הצטרפו לערוץ הטלגרם שלנו למבצעים על חלקי גיטרה ואביזרים`,
                channelSelectionMap['guitarParts'].telegramLink
            ),
    },
    favors: {
        generatePrompt: (formData: FormData) =>
            generateAdTemplate(
                formData,
                `הצטרפו לערוץ הטלגרם שלנו למבצעים מיוחדים למתנות ואביזרים`,
                channelSelectionMap['favors'].telegramLink
            ),
    },
}

export const CHANNEL_OPTIONS = Object.entries(channelSelectionMap).map(([key, { label }]) => ({
    value: key,
    label,
}))
