import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
