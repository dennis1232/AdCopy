/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { signOut } from 'next-auth/react'

const ProfileClient = ({ session }: { session: any }) => {
    return (
        <div>
            <h1>Welcome, {session.user.name}!</h1>
            <p>Email: {session.user.email}</p>
            <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    )
}

export default ProfileClient
