// components/InputField.tsx
'use client'

import React from 'react'
import TextField from '@mui/material/TextField'

interface InputFieldProps {
    label: string
    name: string
    type?: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    fullWidth?: boolean
    required?: boolean
    disabled?: boolean
    error?: boolean
    helperText?: React.ReactNode
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
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
            type={type}
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
            {...rest}
        />
    )
}

export default InputField
