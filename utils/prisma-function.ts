"use server";
import prisma from "@/lib/prisma"


// Lightweight Prisma helper functions used around the app. They wrap
// common lookups (by id or email) to keep call sites concise.
export const findProductsById = async (id: string) => {

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    })

    return product;
}

// Get a user by their unique id
export const getUserbyId = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })

    return user;
}


// Get a user by their unique email
export const getUserbyEmail = async (email: string) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    return user;
}

