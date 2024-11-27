'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'

interface AdCopy {
    _id: string
    content: string
    imageUrl: string
    date: string
}

const AdCopiesPage: React.FC = () => {
    const [adCopies, setAdCopies] = useState<AdCopy[]>([])

    useEffect(() => {
        const fetchAdCopies = async () => {
            try {
                const response = await axios.get('/api/adCopies')
                setAdCopies(response.data)
            } catch (error) {
                console.error('Error fetching ad copies:', error)
            }
        }

        fetchAdCopies()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Your Ad Copies</h1>
                {adCopies.length > 0 ? (
                    adCopies.map((adCopy) => (
                        <AdCopyPreview
                            key={adCopy._id}
                            imageUrl={adCopy.imageUrl}
                            content={adCopy.content}
                            date={adCopy.date}
                        />
                    ))
                ) : (
                    <p>You have not generated any ad copies yet.</p>
                )}
            </div>
        </div>
    )
}

export default AdCopiesPage
