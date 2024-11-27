// components/Card.tsx
'use client'

import { classNames } from '@/utils/classnames'
import React from 'react'

interface CardProps {
    header?: React.ReactNode
    footer?: React.ReactNode
    children: React.ReactNode
    className?: string
}

const Card: React.FC<CardProps> = ({ header, footer, children, className, ...props }) => {
    return (
        <div className={classNames('bg-white border border-gray-200 rounded-lg shadow-sm', className)} {...props}>
            {header && <div className="px-4 py-2 border-b border-gray-200">{header}</div>}
            <div className="px-4 py-2">{children}</div>
            {footer && <div className="px-4 py-2 border-t border-gray-200">{footer}</div>}
        </div>
    )
}

export default Card
