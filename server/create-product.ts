"use server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

type Category = "RUNNING" | "CASUAL" | "SPORTS" | "BOOTS"


export const createProduct = async ({
    name,
    price,
    quantity,
    imageUrl,
    description,
    category
}: {
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    description: string
    category: Category
}) => {
    // Server action to create a new product in the database and then
    // redirect back to the settings items page.
    try {
        await prisma.product.create({
            data: {
                name,
                price,
                quantity,
                imageUrl,
                description,
                oldPrice: 0,
                category
            }
        })
        redirect("/setting?link=items")
        return { message: "the item created succ", type: "done" }
    } catch {
        return { message: "unexpected error occur", type: "error" }
    }
}