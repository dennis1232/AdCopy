// components/Button.tsx
'use client'

import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

interface ButtonProps extends MuiButtonProps {
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'contained',
    size = 'medium',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {
    return (
        <MuiButton variant={variant} size={size} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                <>
                    {leftIcon && <span style={{ marginRight: '0.5rem' }}>{leftIcon}</span>}
                    {children}
                    {rightIcon && <span style={{ marginLeft: '0.5rem' }}>{rightIcon}</span>}
                </>
            )}
        </MuiButton>
    )
}

export default Button
