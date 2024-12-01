import { Toaster } from 'react-hot-toast'
import Navbar from './components/NavBar'

import './globals.css'

export const metadata = {
    title: 'Ad Copy Generator',
    description: 'Generate engaging ad copies effortlessly',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="mt-12">
                    <Navbar />
                    {children}
                    <Toaster />
                </main>
            </body>
        </html>
    )
}
