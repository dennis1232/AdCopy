import { withAuth } from 'next-auth/middleware'

export default withAuth({
    // callbacks: {
    //     authorized: ({ token }) => {
    //         console.log('Middleware Token:', token)
    //         return !!token?.id
    //     },
    // },
})

// export const config = {
//     matcher: ['/', '/ad-copies', '/form'], // Protect these routes
// }
