"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

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
        return { message: "the password change succ", type: "done" }
    } catch {
        return { message: "something went wrong", type: "error" }
    }
}