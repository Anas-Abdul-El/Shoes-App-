"use server";

import prisma from "@/lib/prisma";
import { formSchema, type FormSchemaType } from "../schemas/form-schema";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export async function signInAction(data: FormSchemaType) {
    const velidateData = formSchema.safeParse(data);

    if (!velidateData.success) return { error: "validation field" }

    const { email, password, name } = velidateData.data;

    const isAccountExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isAccountExist) return { error: "account already exist" }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
            }
        })
    } catch (error) {
        return { error: "unexpected error :" + error }
    }

    redirect("/login")
}