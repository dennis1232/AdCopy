'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const SessionProvider = ({ children }: { children: ReactNode }) => {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

export default SessionProvider
