"use client";

import Image from "next/image"
import { type Product } from "../Collections-Contect"
import { Button } from "@/components/ui/button"
import { X, ShoppingBag } from "lucide-react"
import { notFound, useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { addToCart } from "@/../server/add-to-cart";


export type Errors = { errors: { message: string } }


function ItemsWr({
    product,
}: {
    product: Product | null,
}) {

    const router = useRouter();
    const intialsState: Errors = {
        errors: { message: "" },
    }

    const [isClicked, setClicked] = useState(false);
    const [state, formAction, isPending] = useActionState(addToCart, intialsState);

    return (
        <>
            {
                product ? (
                    <div className="bg-zinc-900 w-full md:w-8/10 md:h-130 h-9/10 rounded-lg flex sm:flex-row flex-col ">
                        <div className="sm:h-full sm:w-4/10 w-full h-4/10">
                            <Image
                                src={product?.imageUrl}
                                alt={product?.name}
                                height={500}
                                width={300}
                                className="w-full h-full object-cover rounded-l-lg"
                            />
                        </div>
                        <div className="h-full ms:w-6/10 w-10/10 p-4 flex flex-col space-y-16">
                            <div className="w-19/20 h-10 ml-8 flex justify-between items-center">
                                <h1 className="font-bold text-2xl italic">{product?.name}</h1>
                                <Button
                                    variant={"ghost"}
                                    size={"icon-sm"}
                                    className="rounded-full cursor-pointer"
                                    onClick={() => router.push("/collections")}>
                                    <X />
                                </Button>
                            </div>
                            <div className=" w-9/10 h-6/10 mx-auto mb-1">
                                <h2 className="text-xl">Descreption</h2>
                                <ul className="list-disc list-inside space-y-2 mt-4">
                                    <li className="capitalize">type : {product?.category.toLowerCase()}</li>
                                    <li>{product?.description}</li>
                                    <li>quantity: {product?.quantity}</li>
                                </ul>
                            </div>
                            <div className="sm:w-9/10 w-full h-13 sm:mx-auto mb-1 flex justify-between items-center ">
                                <div className="mr-4">
                                    {
                                        product?.oldPrice === 0 ? (
                                            <p className="font-bold text-3xl italic">{product?.price}$</p>
                                        ) : (
                                            <div className="flex items-end space-x-2">
                                                <span className="line-through font-bold text-xl text-red-400 italic">{product?.oldPrice}</span>
                                                <span className="font-bold text-3xl italic">{product?.price}$</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col sm:w-50 space-y-3 items-center">
                                    <Button
                                        variant={"default"}
                                        className={`bg-black p-4 cursor-pointer w-full h-full hover:bg-zinc-700`}
                                        onClick={() => setClicked(!isClicked)}>
                                        {
                                            !isClicked ? (<>
                                                <ShoppingBag className="sm:inline-block sm:mr-2 flex justify-center items-center" />
                                                Add to Bag
                                            </>) : (
                                                <>
                                                    Cancel
                                                </>
                                            )
                                        }
                                    </Button>
                                    {
                                        isClicked && (
                                            <div className="bg-black p-4 cursor-pointer w-7/6 h-full  border border-gray-400 rounded-xl">
                                                <form action={formAction} className="flex justify-evenly items-center flex-col space-y-4">
                                                    <div className="flex justify-evenly items-center w-full">
                                                        <label htmlFor="quantity">Quantity:</label>
                                                        <input
                                                            type="text"
                                                            id="quantity"
                                                            name="quantity"
                                                            className="border-gray-400 border-b-2 p-2 w-10" />
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="productId"
                                                        value={product?.id} />
                                                    <Button type="submit" disabled={isPending}>
                                                        {isPending ? "Adding..." : "Confirm"}
                                                    </Button>
                                                    <p>{state.errors.message}</p>
                                                </form>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : notFound()
            }
        </>
    )
}

export default ItemsWr