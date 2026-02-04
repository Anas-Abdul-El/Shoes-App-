"use server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

type Category = "RUNNING" | "CASUAL" | "SPORTS" | "BOOTS"

export const editItem = async ({
    id,
    name,
    price,
    quantity,
    imageUrl,
    description,
    category
}: {
    id: string
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    description: string
    category: Category
}) => {

    // Update an existing product. If the new price is higher than the
    // previous price, `oldPrice` is reset to 0; otherwise `oldPrice` is
    // set to the previous price value. Returns a simple status object.
    try {

        const product = await prisma.product.findUnique({
            where: {
                id
            },
        })

        if (!product) {
            return { message: "the item not found", type: "error" }
        }

        if (price > product?.price)
            await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    price,
                    oldPrice: 0,
                    quantity,
                    imageUrl,
                    description,
                    category
                }
            })
        else {

            await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    price,
                    oldPrice: product?.price,
                    quantity,
                    imageUrl,
                    description,
                    category
                }
            })

        }
        return { message: "the item updated succ", type: "done" }
    } catch {
        return { message: "unexpected error occur", type: "error" }
    }

}