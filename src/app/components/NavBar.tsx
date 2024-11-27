// components/Navbar.tsx
'use client'

import Link from 'next/link'
import React from 'react'
import { Avatar } from '@/app/components'

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-1">
                <div className="text-xl font-bold">
                    <Link href="/">Ad Copy Generator</Link>
                </div>
                <div>
                    <Link href="/form" className="mx-2 hover:text-gray-200">
                        Generate Ad Copy
                    </Link>
                    <Link href="/ad-copies" className="mx-2 hover:text-gray-200">
                        Ad Copies
                    </Link>
                </div>
                <Avatar />
            </div>
        </nav>
    )
}

export default Navbar
