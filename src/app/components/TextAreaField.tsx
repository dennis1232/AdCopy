import React from 'react'

interface TextAreaFieldProps {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    rows?: number
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, placeholder, rows = 2 }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor={name}>
                {label}
            </label>
            <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
            ></textarea>
        </div>
    )
}

export default TextAreaField
