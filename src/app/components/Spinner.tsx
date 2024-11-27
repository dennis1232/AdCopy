// components/Spinner.tsx
'use client'

import { classNames } from '@/utils/classnames'
import React from 'react'

interface SpinnerProps {
    size?: 'small' | 'medium' | 'large'
    className?: string
}

const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className }) => {
    return (
        <svg
            className={classNames('animate-spin text-current', sizeClasses[size], className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Loading"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
    )
}

export default Spinner
