import NextAuth from "next-auth"
import prisma from "../lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/../schemas/form-schema"
import bcrypt from "bcrypt"
import { log } from "../../server/Log"

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [Credentials({
        async authorize(credentials) {
            try {
                const validateData = loginSchema.parse(credentials);

                const { email, password } = validateData

                const acc = await prisma.user.findUnique({
                    where: { email }
                })

                if (!acc || !acc.password) return null

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
        session: ({ session, token }) => {
            if (token && token.sub) {
                session.id = token.sub
            }
            if (token && token.role) {
                session.role = String(token.role)
            }

            return session
        },

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
    adapter: PrismaAdapter(prisma),

})