"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Product } from "./Admin-setting";




type Products = Product[];

function ItemsAdmin({ products }: { products: Products }) {

    const handleProductClick = (id: string) => {
        redirect(`/collections/${id}`)
    }

    const product = products[0]

    return (
        <>
            <div className="bg-white absolute p-1 rounded-full top-25 left-25">
                <Plus color="black" />
            </div>
            <div className="absolute w-full h-full py-22 flex flex-col space-y-8">
                <div className="w-8/10 h-30 bg-black mx-auto rounded-2xl p-5">
                    <div className='flex justify-start items-center h-full'>
                        <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                        <div className='flex flex-col justify-between h-full'>
                            <h2 className='text-white font-bold italic'>{product.name}</h2>
                            <div className='flex flex-col md:flex-row space-x-8'>
                                <p className='text-white'>
                                    <span className='text-green-500'>price</span> : <span className='italic'>{product.price}</span>$
                                </p>
                                <p>Quantity : {product.quantity}</p>
                                <p className=" capitalize cursor-pointer" onClick={() => { }}>edit</p>
                                <p className=" capitalize cursor-pointer" onClick={() => { }}>delete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsAdmin