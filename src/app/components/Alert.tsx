'use client'

import { classNames } from '@/utils/classnames'
import React from 'react'

interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info'
    title?: string
    children: React.ReactNode
}

const typeStyles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
}

const Alert: React.FC<AlertProps> = ({ type = 'info', title, children }) => {
    return (
        <div className={classNames('border-l-4 p-4', typeStyles[type])} role="alert">
            {title && <p className="font-bold">{title}</p>}
            <p>{children}</p>
        </div>
    )
}

export default Alert
