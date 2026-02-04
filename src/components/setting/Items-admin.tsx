"use client";

import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Product } from "./Admin-setting";
import { deleteFromProduct } from "../../../server/delete-from-products";




type Products = Product[];

function ItemsAdmin({ products }: { products: Products }) {

    // Renders the list of products in admin view and provides actions
    // to add, edit or delete products. Uses server action `deleteFromProduct`.
    const [isPending, setTransition] = useTransition()
    const [msg, setMsg] = useState("")

    const handleDelete = (id: string) => {
        setTransition(() => {
            if (!isPending)
                deleteFromProduct(id)
                    .then(res => {
                        if (res.message) {
                            setMsg(res.message)
                        }
                    })
        }
        )
    }

    return (
        <>
            <div className="bg-white fixed sm:z-1 p-1 rounded-full top-25 right-20 cursor-pointer" onClick={() => redirect("/setting/addItem")}>
                <Plus color="black" />
            </div>
            <div className="absolute w-full h-full py-40 sm:py-22 flex flex-col space-y-8">
                {
                    products.map(ele => {
                        return (
                            <div className="w-8/10 h-fit sm:h-30 bg-zinc-900 mx-auto rounded-2xl p-5" key={ele.id}>
                                <div className='flex justify-start sm:items-center h-full flex-col sm:flex-row space-y-5'>
                                    <img src={ele.imageUrl} alt={ele.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                                    <div className='flex flex-col justify-between h-full'>
                                        <h2 className='text-white font-bold italic'>{ele.name}</h2>
                                        <div className='flex flex-col md:flex-row space-x-8'>
                                            <p className='text-white'>
                                                <span className='text-green-500'>price</span>: <span className='italic'>{ele.price}</span>$
                                            </p>
                                            <p>Quantity : {ele.quantity}</p>
                                            <p className=" capitalize cursor-pointer" onClick={() => redirect(`/setting/editItems/${ele.id}`)}>edit</p>
                                            <p className=" capitalize cursor-pointer" onClick={() => handleDelete(ele.id)}>delete</p>
                                        </div>
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

export default ItemsAdmin