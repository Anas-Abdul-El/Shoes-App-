"use server";
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

type ActivityType =
    | "LOGIN"
    | "LOGOUT"
    | "PURCHASE"
    | "REVIEW"
    | "UPDATE_PROFILE"

export const log = async ({
    type,
    action,
    details,
    orderId
}: {
    type: ActivityType
    action: string
    details?: object
    orderId?: string
}) => {
    // Persist an activity log entry associated with the current user.
    // This function obtains the authenticated user via `auth()`; if no
    // user is present the log will not be created.
    try {
        const user = await auth()
        if (!user || !user.id) {
            throw new Error("User is not authenticated")
        }

        const userId = user.id

        await prisma.activityLog.create({
            data: {
                type,
                userId,
                action,
                details,
                orderId,
            }
        })
    } catch (error) {
        console.error("Error logging activity:", error)
    }
}