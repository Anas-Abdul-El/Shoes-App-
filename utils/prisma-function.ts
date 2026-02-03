"use server";
import prisma from "@/lib/prisma"

// function to find product by its id
export const findProductsById = async (id: string) => {

    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    })

    return product;
}

// function to get user by id
export const getUserbyId = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })

    return user;
}


// function to get user by email
export const getUserbyEmail = async (email: string) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    return user;
}

