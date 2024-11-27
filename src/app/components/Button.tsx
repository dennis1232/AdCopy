// components/Button.tsx
'use client'

import { classNames } from '@/utils/classnames'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline'
    size?: 'small' | 'medium' | 'large'
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out'

    const variantStyles = {
        primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        outline: 'text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    }

    const sizeStyles = {
        small: 'px-2.5 py-1.5 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
    }

    const disabledStyles = 'opacity-50 cursor-not-allowed'
    const loadingStyles = isLoading ? 'cursor-wait' : ''

    const combinedClassName = classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && disabledStyles,
        loadingStyles,
        className
    )

    return (
        <button className={combinedClassName} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    role="status"
                    aria-label="Loading"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            ) : (
                <>
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="ml-2">{rightIcon}</span>}
                </>
            )}
        </button>
    )
}

export default Button
