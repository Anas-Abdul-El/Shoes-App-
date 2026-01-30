"use server";

import prisma from "@/lib/prisma";
import { addressSchema, AddressSchemaType } from "../schemas/form-schema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export const addAdress = async (address: AddressSchemaType) => {

    const user = await auth()

    if (!user || !user.id) return "You must be logged in to add items to cart."

    const userId = user?.id

    // Logic to add address to the database or perform other actions
    const validateAddress = addressSchema.safeParse(address);

    if (!validateAddress.success) return "Incorrect Types"


    const {
        street,
        city,
        state,
        zipCode,
        country,
    } = validateAddress.data


    await prisma.address.create({
        data: {
            street,
            city,
            state,
            zipCode,
            country,
            userId
        }
    })

    redirect("/cart")

}