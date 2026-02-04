"use server"
import { signOut } from "@/lib/auth"

export const signOutFromAcc = async () => {
    // Server action that signs the current user out and redirects home.
    await signOut({ redirectTo: "/" })
} 