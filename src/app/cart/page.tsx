import type { Metadata } from "next";
import CartWr from '@/components/cart/Cart-wr'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const metadata: Metadata = {
    title: "Shopping Cart - Shoes Store | Checkout",
    description: "Review your shopping cart and proceed to checkout. Secure payment for premium shoes.",
    robots: "noindex, nofollow",
    openGraph: {
        title: "Shopping Cart - Shoes Store",
        description: "Review your shopping cart and proceed to checkout.",
        type: "website",
        url: "https://shoes-store.com/cart",
    },
};

async function Page() {
    // Cart page: server component that loads the authenticated user's
    // cart items and passes them to the client `CartWr` component.
    const user = await auth();

    const id = user?.id

    const cart = await prisma.cartItem.findMany({
        where: {
            userId: id
        },
        include: {
            product: true
        }
    })

    const products = cart.map(ele => {
        return { ...ele.product, cardQuantity: ele.quantity }
    })

    return (
        <main className='w-screen h-screen flex justify-center items-center p-0 m-0 box-border'>
            <CartWr products={products} id={id} />
        </main>
    )
}

export default Page