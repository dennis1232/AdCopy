'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useToast from '@/hooks/useToast'
import { FaGoogle } from 'react-icons/fa'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { showSuccess, showError } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })
        console.log(res)

        if (res && !res.error) {
            showSuccess('Logged in successfully!')
            router.push('/') // Redirect to dashboard or desired page
        } else {
            showError(res?.error || 'An error occurred')
        }
    }

    const handleGoogleSignIn = async () => {
        const res = await signIn('google', { redirect: false })

        if (res && !res.error) {
            showSuccess('Logged in with Google!')
            router.push('/dashboard') // Redirect to dashboard or desired page
        } else {
            showError(res?.error || 'An error occurred')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded mb-4 hover:bg-red-600 transition duration-200"
            >
                <FaGoogle className="mr-2" />
                Sign in with Google
            </button>
            <div className="text-center text-gray-500 my-4">or</div>
            <form onSubmit={handleSubmit}>
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
                        autoComplete="current-password"
                    />
                </div>
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don&apos;t have an account?{' '}
                <a href="/auth/register" className="text-blue-600 hover:underline">
                    Register
                </a>
            </p>
        </div>
    )
}

export default LoginPage
