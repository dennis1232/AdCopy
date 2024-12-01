import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Credentials Provider
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Connect to the database
                await dbConnect()

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }

                // Find user by email
                const user = await User.findOne({ email: credentials?.email }).select('+password')

                if (!user) {
                    throw new Error('No user found with this email')
                }

                // If the user has no password (signed up via Google), prevent credentials login
                if (!user.password) {
                    throw new Error('Please sign in with Google')
                }

                // Compare the password
                const isValid = await bcrypt.compare(credentials?.password, user.password)

                if (!isValid) {
                    throw new Error('Invalid password')
                }

                // Return user object
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        // Optional: specify other custom pages
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
            console.log('Session Callback:', { session, token })

            // Attach token data to the session
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                }
            }

            return session
        },

        async jwt({ token, user, account }) {
            console.log('JWT Callback:', { token, user, account })
            if (user) {
                token.id = user.id // Add user ID
                token.email = user.email // Add email
                token.name = user.name // Add name
            }

            // If using an OAuth provider, add the access token
            if (account?.provider === 'google') {
                token.accessToken = account.access_token
            }
            return token
        },
        async redirect({ url, baseUrl }) {
            console.log('redirect', url, baseUrl)

            if (url.startsWith(baseUrl)) {
                return url // Allow redirect to the same domain
            }
            return baseUrl // Default to the base URL
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
