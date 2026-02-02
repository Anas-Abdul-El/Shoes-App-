"use server";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteFromProduct = async (productId: string) => {
    try {
        if (!productId) return { message: "Invalid product ID." };

        await prisma.product.delete({
            where: {
                id: productId,
            }
        })
        revalidatePath('/setting?link=items');
        return { message: null }

    } catch (error) {
        return { message: "Failed to delete item from cart." }
    }
}