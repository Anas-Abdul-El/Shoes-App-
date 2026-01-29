import CartWr from '@/components/cart/Cart-wr'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

async function Page() {

    const user = await auth()

    console.log(user);


    const id = user?.id

    const cart = await prisma.cartItem.findMany({
        where: {
            userId: id
        },
    })

    const products = cart.map(async (ele) => {
        return await prisma.product.findUnique({
            where: {
                id: ele.productId
            }
        })
    })

    return (
        <main className='w-screen h-screen flex justify-center items-center p-0 m-0 box-border'>
            <CartWr products={products} />
        </main>
    )
}

export default Page