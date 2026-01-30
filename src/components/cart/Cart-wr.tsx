"use client";

import { Product } from '../collection/Collections-Contect'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { deleteFromCart } from '../../../server/delete-from-cart';
import { useState, useTransition } from 'react';
import { set } from 'zod';
import { start } from 'repl';


function CartWr({
    products,
    id,
}: {
    products: Array<Product & { cardQuantity: number }>
    id: string | undefined
}) {

    const [message, setMessage] = useState<string | null>(null);

    if (!id) {
        return (
            <div className='bg-zinc-900 w-9/10 md:h-9/13 h-10/12 rounded-xl flex justify-center items-center p-4 box-border overflow-auto'>
                <h2 className='text-white font-bold italic'>Please login to view your cart.</h2>
            </div>
        )
    }

    const [isPending, startTransition] = useTransition();

    const handleDelete = (productId: string) => {
        startTransition(() => {
            deleteFromCart(id, productId)
                .then((res) => setMessage(res?.message))
        })
    }

    return (
        <>
            <div className='bg-zinc-900 w-9/10 md:h-9/13 h-10/12 rounded-xl flex flex-col justify-start items-center p-4 box-border overflow-auto'>
                <p>{message}</p>
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className='w-full md:h-24 h-30 bg-zinc-800 rounded-md mb-4 flex justify-start items-center p-4 box-border border border-zinc-700'>
                                <div className='h-full w-full flex justify-between items-center'>
                                    <div className='flex justify-start items-center h-full'>
                                        <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                                        <div className='flex flex-col justify-between h-full'>
                                            <h2 className='text-white font-bold italic'>{product.name}</h2>
                                            <div className='flex flex-col md:flex-row space-x-8'>
                                                <p className='text-white'>
                                                    <span className='text-green-500'>price</span> : <span className='italic'>{product.price}</span>$
                                                </p>
                                                <p>Quantity : {product.cardQuantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(product.id)}
                                            className='cursor-pointer'>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <Button
                    onClick={() => { }}
                    className='bg-white w-40 h-15 fixed mx-auto bottom-9 rounded-md flex justify-center items-center cursor-pointer text-black font-bold hover:text-white'>
                    Checkout
                </Button>
            </div>
        </>
    )
}

export default CartWr