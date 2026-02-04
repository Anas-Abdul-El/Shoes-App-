"use server";
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { log } from "./Log";

/**
 * Checkout function that processes the purchase by:
 * 1. Validating user authentication and address
 * 2. Calculating the total price from cart items
 * 3. Creating an order with order items
 * 4. Clearing the user's cart
 * 5. Updating product inventory quantities
 */
export const checkout = async () => {

    // Get the authenticated user session
    const user = await auth()

    // Verify user is logged in
    if (!user || !user.id) return "You should be login"
    const userId = user?.id

    // Fetch user's delivery address
    try {
        await prisma.address.findFirst({
            where: {
                userId,
            }
        })
    } catch {
        // Redirect to address page if no address is set
        redirect("/address")
    }

    // Use transaction to ensure atomicity of all operations
    try {
        await prisma.$transaction(async (db) => {

            // Retrieve all items from user's cart with product details
            const cart = await db.cartItem.findMany({
                where: {
                    userId
                },
                include: { product: true }
            })

            // Return early if cart is empty
            if (cart.length === 0) throw new Error("the cart is empty")

            // Calculate total price by summing quantity × price for each item
            const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

            // Create a new order record with the calculated total price
            const order = await db.order.create({
                data: {
                    userId,
                    totalPrice,

                }
            })

            // Create order items for each product in the cart
            await db.orderItem.createMany({
                data: cart.map(item => {
                    return {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    }
                }),
            })

            // Clear all items from user's cart after order creation
            await db.cartItem.deleteMany({
                where: {
                    userId
                }
            })

            // Update product inventory by decrementing quantities based on purchased items
            for (const item of cart) {
                await db.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        quantity: { decrement: item.quantity }
                    }
                })
            }

            log({ type: "PURCHASE", action: `User ${userId} completed a purchase.`, orderId: order.id, details: { totalPrice, quantity: cart.length } })
        })

        revalidatePath("/cart")
        return "Checkout Done"
    } catch (error) {
        return "the cart is empty"
    }
}