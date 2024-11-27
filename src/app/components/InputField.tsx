'use client'

import React from 'react'

interface InputFieldProps {
    label: string
    name: string
    type?: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor={name}>
                {label}
            </label>
            <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputField
