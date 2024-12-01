'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import useToast from '@/hooks/useToast'

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { showSuccess, showError } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await axios.post('/api/auth/register', {
                name,
                email,
                password,
            })

            if (res.status === 201) {
                showSuccess('Registration successful! Please log in.')
                router.push('/auth/login')
            } else {
                showError(res.data.error || 'An error occurred')
            }
        } catch {
            showError('An error occurred')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                    Login
                </a>
            </p>
        </div>
    )
}

export default RegisterPage
