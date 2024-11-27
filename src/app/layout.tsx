import Navbar from './components/NavBar'
import './globals.css'

export const metadata = {
    title: 'Ad Copy Generator',
    description: 'Generate engaging ad copies effortlessly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}
