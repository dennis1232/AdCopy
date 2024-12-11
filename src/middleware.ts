import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: (auth) => {
            return !!auth.token?.id
        },
    },
})

export const config = {
    matcher: ['/ad-copies', '/form'],
}
