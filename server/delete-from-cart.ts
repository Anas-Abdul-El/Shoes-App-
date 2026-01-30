"use server";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteFromCart = async (userId: string, productId: string) => {
    try {
        if (!userId || !productId) return { message: "Invalid user or product ID." };

        await prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: productId
                }
            }
        })
        revalidatePath('/cart');
        return { message: null }

    } catch (error) {
        return { message: "Failed to delete item from cart." }
    }
}