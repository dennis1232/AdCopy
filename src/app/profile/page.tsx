'use client'

import ProfileClient from './profileClient'
// import { useSession } from 'next-auth/react'

export default function ProfilePage() {
    // const { data: session } = useSession()

    return <p>You need to log in to view this page.</p>

    return <ProfileClient session={{}} />
}
