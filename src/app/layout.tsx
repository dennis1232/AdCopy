import { Toaster } from 'react-hot-toast'
import Navbar from './components/NavBar'
import './globals.css'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SessionProvider from './components/SessionProvider'
import { Container } from '@mui/material'
export const metadata = {
    title: 'Ad Copy Generator',
    description: 'Generate engaging ad copies effortlessly',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SpeedInsights />
                <SessionProvider>
                    <ThemeRegistry>
                        <Navbar />
                        <Container className="mt-10">{children}</Container>
                        <Toaster />
                    </ThemeRegistry>
                </SessionProvider>
            </body>
        </html>
    )
}
