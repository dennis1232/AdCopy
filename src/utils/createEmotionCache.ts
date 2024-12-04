// app/utils/createEmotionCache.ts
import createCache, { EmotionCache } from '@emotion/cache'

const isBrowser = typeof document !== 'undefined'

// On the client, we can safely use a singleton
let cache: EmotionCache

export default function createEmotionCache() {
    if (isBrowser) {
        if (!cache) {
            cache = createCache({ key: 'css', prepend: true })
        }
        return cache
    } else {
        // On the server, we need to create a new cache for each request
        return createCache({ key: 'css' })
    }
}
