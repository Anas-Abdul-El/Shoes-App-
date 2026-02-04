"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { log } from "./Log"

// Server action to update the authenticated user's display name and log it.
export const changeTheName = async (name: string) => {

    const user = await auth()

    if (!user || !user?.user?.name || !user.id) return { message: "the user not logged in", type: "error" }
    const userId = user.id

    try {
        await prisma.user.update({
            where: {
                id: userId,

            },
            data: {
                name,
            }
        })

        await log({ type: "UPDATE_PROFILE", action: "Changed user name", details: { previousName: user.user.name, newName: name } })
        return { message: "the name change succ", type: "done" }
    } catch {
        return { message: "something went wrong", type: "error" }
    }
}