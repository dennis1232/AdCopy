// components/TextAreaField.tsx
'use client'

import React from 'react'
import TextField from '@mui/material/TextField'

interface TextAreaFieldProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    rows?: number
    fullWidth?: boolean
    required?: boolean
    disabled?: boolean
    error?: boolean
    helperText?: React.ReactNode
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 2,
    fullWidth = true,
    required = false,
    disabled = false,
    error = false,
    helperText,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            error={error}
            helperText={helperText}
            variant="outlined"
            margin="normal"
            multiline
            rows={rows}
            {...rest}
        />
    )
}

export default TextAreaField
