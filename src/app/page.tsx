// app/page.tsx

import React from 'react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center p-6">
                <h1 className="text-4xl font-bold mb-4">Welcome to Ad Copy Generator</h1>
                <p className="text-lg mb-6">Create engaging ad copies effortlessly.</p>
                <div>
                    <a
                        href="/form"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mx-2"
                    >
                        Generate Ad Copy
                    </a>
                    <a
                        href="/ad-copies"
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mx-2"
                    >
                        View Ad Copies
                    </a>
                </div>
            </div>
        </div>
    )
}
