import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export const changeTheName = async (name: string) => {

    const user = await auth()

    if (!user || !user?.user?.name || user.id) return { message: "the user not logged in" }
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
        return { message: "the password change suc" }
    } catch (error) {
        return { message: "something went wrong" }
    }
}