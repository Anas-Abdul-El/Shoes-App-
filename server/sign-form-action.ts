"use server";

import prisma from "@/lib/prisma";
import { formSchema, type FormSchemaType } from "../schemas/form-schema";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export async function signInAction(data: FormSchemaType & { role?: "USER" | "ADMIN" }) {
    // Validate incoming form data using Zod schema
    const velidateData = formSchema.safeParse(data);

    if (!velidateData.success) return { error: "validation field" }

    const { email, password, name } = velidateData.data;

    // Prevent duplicate accounts for the same email
    const isAccountExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isAccountExist) return { error: "account already exist" }

    // Hash the password before persisting
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                email,
                name,
                role: data.role || "USER",
                password: hashPassword,
            }
        })
    } catch (error) {
        return { error: "unexpected error :" + error }
    }

    // After successful sign-up redirect to login page
    redirect("/login")
}