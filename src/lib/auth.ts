import NextAuth from "next-auth"
import prisma from "../lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/../schemas/form-schema"
import bcrypt from "bcrypt"
import { log } from "../../server/Log"

// NextAuth configuration: credentials provider with a custom authorize
// function, JWT sessions, and a Prisma adapter for persistence.
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        // Use JWT for session strategy (stateless tokens)
        strategy: "jwt",
    },
    providers: [Credentials({
        // Custom credential-based sign-in handler
        async authorize(credentials) {
            try {
                // Validate incoming data using zod schema
                const validateData = loginSchema.parse(credentials);

                const { email, password } = validateData

                // Look up the user by email
                const acc = await prisma.user.findUnique({
                    where: { email }
                })

                if (!acc || !acc.password) return null

                // Compare provided password with stored hash
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    acc.password
                )

                if (!isPasswordMatch) return null

                return acc
            } catch (error) {
                console.error("Error in authorize function:", error);
                return null;
            }

        },
    })],
    callbacks: {
        // Add token-subject and role to the session object returned to the client
        session: ({ session, token }) => {
            if (token && token.sub) {
                session.id = token.sub
            }
            if (token && token.role) {
                session.role = String(token.role)
            }

            return session
        },

        // Populate JWT with user's role from DB on sign-in / token refresh
        jwt: async ({ token }) => {

            const { sub } = token
            const acc = await prisma.user.findUnique({
                where: { id: sub }
            })

            if (acc) {
                token.role = acc.role as string
            }
            return token
        },
        // side-effect: log sign-in events to server log
        signIn: async ({ user }) => {
            const acc = await prisma.user.findUnique({
                where: { id: user.id }
            })
            if (acc) {
                log({ type: "LOGIN", action: `User ${user.name} logged in.` })
            }
            return true
        },
    },
    // Persist auth data using Prisma
    adapter: PrismaAdapter(prisma),

})