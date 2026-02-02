"use server"
import { signOut } from "@/lib/auth"

export const signOutFromAcc = async () => {
    await signOut({ redirectTo: "/" })
} 