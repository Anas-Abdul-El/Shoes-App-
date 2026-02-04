"use server";

import { loginSchema, type LoginSchemaType } from "../schemas/form-schema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";


export async function loginInAction(data: LoginSchemaType) {

    // Validate incoming credentials
    const velidateData = loginSchema.safeParse(data);

    if (!velidateData.success) return { error: "validation field" }

    const { email, password } = velidateData.data

    try {
        // Use NextAuth signIn with credentials provider
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })
    } catch (error) {
        // Map authentication errors into a friendly response
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "unexpected error! " }
            }
        }

        throw error
    }

}