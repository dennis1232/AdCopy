// lib/adTemplates.ts

import { FormData } from '@/types'

export type BotChannelVariant = 'tennis' | 'wedding' | 'test'

interface AdTemplateConfig {
    generatePrompt: (formData: FormData) => string
}

export const adTemplateMap: Record<BotChannelVariant, AdTemplateConfig> = {
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
