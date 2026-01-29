import { Product } from '../collection/Collections-Contect'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'


async function CartWr({
    products,
}: {
    products: Array<Product & { cardQuantity: number }>
}) {




    return (
        <>
            <div className='bg-zinc-900 w-9/10 h-8/10 rounded-xl flex flex-col justify-start items-center p-4 box-border overflow-auto'>
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className='w-full h-24 bg-zinc-800 rounded-md mb-4 flex justify-start items-center p-4 box-border border border-zinc-700'>
                                <div className='h-full w-full flex justify-between items-center'>
                                    <div className='flex justify-start items-center h-full'>
                                        <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                                        <div className='flex flex-col justify-between h-full'>
                                            <h2 className='text-white font-bold italic'>{product.name}</h2>
                                            <div className='flex space-x-8'>
                                                <p className='text-white'>
                                                    <span className='text-green-500'>price</span> : <span className='italic'>{product.price}</span>$
                                                </p>
                                                <p>Quantity : {product.cardQuantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <Button variant="ghost" size="icon" className='cursor-pointer'>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CartWr