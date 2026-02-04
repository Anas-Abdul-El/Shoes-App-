"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { log } from "./Log"

// Server action to change the authenticated user's password.
// - Verifies the old password, updates to the new password, and logs the change.
export const changeThePassword = async (password: { oldPass: string, newPass: string }) => {

    const user = await auth()

    if (!user || !user?.user?.name || !user.id) return { message: "the user not logged in", type: "error" }
    const userId = user.id

    const acc = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const { newPass, oldPass } = password

    if (!acc || !acc.password) return { message: "something wen wrong", type: "error" }

    const isPassCorrect = await bcrypt.compare(
        oldPass,
        acc.password
    )

    if (!isPassCorrect) return { message: "the password is incorrect", type: "error" }

    try {
        await prisma.user.update({
            where: {
                id: userId,

            },
            data: {
                password: newPass,
            }
        })

        await log({ type: "UPDATE_PROFILE", action: "Changed user password" })
        return { message: "the password change succ", type: "done" }
    } catch {
        return { message: "something went wrong", type: "error" }
    }
}