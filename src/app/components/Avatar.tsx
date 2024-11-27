// components/Avatar.tsx
'use client'

import { classNames } from '@/utils/classnames'
import React from 'react'

interface AvatarProps {
    src?: string
    alt?: string
    size?: 'small' | 'medium' | 'large'
    className?: string
}

const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium', className }) => {
    return (
        <div className={classNames('rounded-full bg-gray-200 overflow-hidden', sizeClasses[size], className)}>
            {src ? (
                <img src={src} alt={alt} className="object-cover w-full h-full" />
            ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-500">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        {/* Placeholder icon */}
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5S7 4.3 7 7s2.3 5 5 5zm0 2c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4z" />
                    </svg>
                </div>
            )}
        </div>
    )
}

export default Avatar
