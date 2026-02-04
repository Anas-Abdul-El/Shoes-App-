'use server'

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Errors } from "@/components/collection/items/Items-wr";

export const addToCart = async (
    prevState: Errors,
    formData: FormData
): Promise<Errors> => {

    // Server action to add an item to the authenticated user's cart.
    // Expects `productId` and `quantity` in the provided FormData.

    const quantity = Number(formData.get('quantity'));
    const productId = formData.get('productId') as string;

    try {
        const user = await auth();
        if (!user?.id) {
            return {
                errors: { message: "You must be logged in to add items to cart." }
            };
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return {
                errors: { message: "Product not found." }
            };
        }

        if (product?.quantity === 0 || product?.quantity < quantity) {
            return {
                errors: { message: "Insufficient quantity available." }
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