import prisma from "@/lib/prisma"

type Category = "RUNNING" | "CASUAL" | "SPORTS" | "BOOTS"

export const editItem = async ({
    id,
    name,
    price,
    quantity,
    imageUrl,
    description,
    oldPrice,
    category
}: {
    id: string
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    description: string
    oldPrice: number
    category: Category
}) => {

    try {
        if (price > oldPrice)
            await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    price,
                    oldPrice,
                    quantity,
                    imageUrl,
                    description,
                    category
                }
            })
        else {
            const product = await prisma.product.findUnique({
                where: {
                    id
                },
            })

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