'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdCopyPreview from '../components/AdCopyPreview'
import useToast from '@/hooks/useToast'
import { APIEndpoints, ToastMessages } from '@/utils/constants'

interface AdCopy {
    _id: string
    content: string
    imageUrl: string
    date: string
}

const AdCopiesPage: React.FC = () => {
    const [adCopies, setAdCopies] = useState<AdCopy[]>([])
    const { showSuccess, showError } = useToast()

    const fetchAdCopies = async () => {
        try {
            const response = await axios.get(APIEndpoints.fetchAdCopies)
            setAdCopies(response.data)
        } catch (error) {
            console.error('Error fetching ad copies:', error)
        }
    }

    useEffect(() => {
        fetchAdCopies()
    }, [])

    const updateAdCopyContent = (e: React.ChangeEvent<HTMLTextAreaElement>, adCopyId: string) => {
        setAdCopies((prevAdCopies) =>
            prevAdCopies.map((ad) => (ad._id === adCopyId ? { ...ad, content: e.target.value } : ad))
        )
    }

    const handleSaveEditedCopy = async (adCopyId: string) => {
        try {
            const adCopy = adCopies.find((ad) => ad._id === adCopyId)
            await axios.post(APIEndpoints.saveAdCopy, {
                ...adCopy,
            })

            showSuccess(ToastMessages.adCopySaved)
        } catch {
            showError(ToastMessages.adCopySaveFailed)
        }
    }

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
                            onEdit={() => handleSaveEditedCopy(adCopy._id)}
                            onChange={(e) => updateAdCopyContent(e, adCopy._id)}
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
