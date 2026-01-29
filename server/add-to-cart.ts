'use server'

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Errors } from "@/components/collection/items/Items-wr";

export const addToCart = async (
    prevState: Errors,
    formData: FormData
): Promise<Errors> => {

    const quantity = Number(formData.get('quantity'));
    const productId = formData.get('productId') as string;

    try {
        const user = await auth();
        if (!user?.id) {
            return {
                errors: { message: "You must be logged in to add items to cart." }
            };
        }

        await prisma.cartItem.create({
            data: {
                userId: user.id,
                productId: productId,
                quantity: quantity
            }
        });

        return {
            errors: { message: "Item added successfully" }
        };
    } catch (error) {
        return {
            errors: { message: "Failed to add to cart." }
        };
    }
};