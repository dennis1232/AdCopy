// components/AdCopyPreview.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import axios from 'axios'
import Button from './Button'

interface AdCopyPreviewProps {
    imageUrl?: string
    content: string
    onSave?: () => void
    showSaveButton?: boolean
    date?: string
}

const AdCopyPreview: React.FC<AdCopyPreviewProps> = ({ imageUrl, content, onSave, date }) => {
    const onSend = async () => {
        await axios.post('/api/sendToTelegram', { imageUrl, message: content })
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row">
                {imageUrl && (
                    <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                        <Image
                            src={imageUrl}
                            alt="Product Image"
                            width={300}
                            height={300}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                )}
                <div className="md:w-2/3 text-right flex flex-col" dir="rtl">
                    <div className="prose prose-lg">
                        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
                    </div>
                    {date && (
                        <p className="text-sm text-gray-500 mt-2">
                            נוצר בתאריך: {new Date(date).toLocaleString('he-IL')}
                        </p>
                    )}
                    <div className="flex gap-2 flex-col">
                        {onSave && (
                            <Button variant="outline" onClick={onSave}>
                                Save
                            </Button>
                        )}

                        <Button onClick={onSend}>Send to channel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdCopyPreview
