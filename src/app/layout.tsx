import { Toaster } from 'react-hot-toast'
import Navbar from './components/NavBar'
import './globals.css'
import ThemeRegistry from '@/utils/ThemeRegistry'
// import SessionProvider from './components/SessionProvider'
export const metadata = {
    title: 'Ad Copy Generator',
    description: 'Generate engaging ad copies effortlessly',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {/* <SessionProvider> */}
                <ThemeRegistry>
                    <Navbar />
                    <main className="mt-16">{children}</main>
                    <Toaster />
                </ThemeRegistry>
                {/* </SessionProvider> */}
            </body>
        </html>
    )
}
