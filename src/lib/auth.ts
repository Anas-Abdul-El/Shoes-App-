import NextAuth from "next-auth"
import prisma from "../lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/../schemas/form-schema"
import bcrypt from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Credentials({
        async authorize(credentials) {
            const validateData = loginSchema.safeParse(credentials);

            if (!validateData.success) return null

            const { email, password } = validateData.data

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
            return true
        }
    },
    adapter: PrismaAdapter(prisma),

})