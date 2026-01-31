import CartWr from '@/components/cart/Cart-wr'
import PayementAlert from '@/components/cart/Payement-alert';
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

async function Page() {

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