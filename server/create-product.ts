import prisma from "@/lib/prisma"

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
        return { message: "the item created succ", type: "done" }
    } catch {
        return { message: "unexpected error occur", type: "error" }
    }
}