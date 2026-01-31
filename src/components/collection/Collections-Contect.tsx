"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/useAnimation";

type Filter = {
    id: number
    type: string
}

const filters: Filter[] = [
    {
        id: 0,
        type: "all",
    },
    {
        id: 1,
        type: "running",
    },
    {
        id: 2,
        type: "casual",
    },
    {
        id: 3,
        type: "sports",
    },
    {
        id: 4,
        type: "boots",
    },
]



type Category = "RUNNING" | "CASUAL" | "SPORTS" | "BOOTS";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    category: Category;
    quantity: number | null;
    imageUrl: string;
}

type Products = Product[];

function CollectionsContect({ products }: { products: Products }) {

    const AviableProducts = products.filter(ele => {
        if (ele.quantity) return ele.quantity > 0
    })

    const [filterName, setFilterName] = useState<string>("all")
    const fliteringProduct = (filterName === "all" || filterName == null)
        ? AviableProducts
        : AviableProducts.filter(ele => ele.category.toLowerCase() === filterName.toLowerCase())

    const itemsVisible = useStaggeredAnimation(fliteringProduct.length, 300, 100);

    const handleFiltersClick = (ele: Filter) => {
        setFilterName(ele.type)
        redirect(`/collections?filter=${ele.type}`)
    }

    const handleProductClick = (id: string) => {
        redirect(`/collections/${id}`)
    }
    return (
        <div className="flex flex-col md:space-y-10 space-y-20 w-8/10 h-100 mt-43 mx-auto">

            <div className=" w-full md:space-x-2 h-15 flex flex-wrap gap-2 animate-slide-up">
                {
                    filters.map((ele, index) => {
                        return (
                            <div
                                key={ele.id}
                                onClick={() => handleFiltersClick(ele)}
                                className={`capitalize h-1/2 w-fit p-5 flex justify-center items-center rounded-2xl border cursor-pointer transition-all duration-500 animation-delay-${(index + 1) * 100}
                                            ${filterName === ele.type ? "bg-white text-black" : "border-white/10 hover:bg-white/9 bg-white/5"}
                                          `}
                            >
                                {ele.type}
                            </div>
                        )
                    })
                }
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-fit mb-10">
                {
                    fliteringProduct.map((ele, index) => {
                        return (
                            <div
                                className={`group text-white transition-all duration-500 ${itemsVisible[index] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}
                                key={ele.id}
                                onClick={() => handleProductClick(ele.id)}>
                                <div className="bg-zinc-900 group-hover:bg-zinc-800 w-full h-100 rounded-xl flex flex-col space-y-5 overflow-hidden cursor-pointer" >
                                    <div className="w-full h-15/10 aspect-square overflow-hidden">
                                        <Image
                                            alt={ele.name}
                                            src={ele.imageUrl}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500 "
                                        />
                                    </div>
                                    <div className="h-full flex flex-col capitalize w-10/12 mx-auto space-y-4">
                                        <p className="text-gray-500 uppercase text-xs">{ele.category}</p>
                                        <p className="text-xl font-bold">{ele.name}</p>
                                        <div className=" flex justify-between w-full">
                                            <p className="text-xl">{ele.price}$</p>
                                            <Button
                                                variant={"ghost"}
                                                className="rounded-full cursor-pointer"
                                                onClick={() => handleProductClick(ele.id)}>
                                                <Info />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CollectionsContect