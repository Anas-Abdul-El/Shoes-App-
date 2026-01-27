"use server";

import { loginSchema, type LoginSchemaType } from "../schemas/form-schema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";


export async function loginInAction(data: LoginSchemaType) {
    const velidateData = loginSchema.safeParse(data);

    if (!velidateData.success) return { error: "validation field" }

    const { email, password } = velidateData.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })
    } catch (error) {
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