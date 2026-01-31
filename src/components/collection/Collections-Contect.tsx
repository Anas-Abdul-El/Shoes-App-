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

    const [filterName, setFilterName] = useState<string>("all")
    const fliteringProduct = (filterName === "all" || filterName == null)
        ? products
        : products.filter(ele => ele.category.toLowerCase() === filterName.toLowerCase())

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




// const prod = [
//     {
//         id: 1,
//         name: "Cloud Runner Pro",
//         price: 189,
//         category: "running",
//         image: "https://images.unsplash.com/photo-1661605813204-8c7662c1a5f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHJ1bm5pbmclMjBzaG9lc3xlbnwxfHx8fDE3NjkyNTUyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 2,
//         name: "Minimal White",
//         price: 149,
//         category: "casual",
//         image: "https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwbWluaW1hbHxlbnwxfHx8fDE3NjkxNjk5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 3,
//         name: "Velocity Sport",
//         price: 219,
//         category: "sports",
//         image: "https://images.unsplash.com/photo-1580058572462-98e2c0e0e2f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGF0aGxldGljJTIwc2hvZXN8ZW58MXx8fHwxNzY5MjU1Mjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 4,
//         name: "Urban Explorer",
//         price: 279,
//         category: "boots",
//         image: "https://images.unsplash.com/photo-1652474590303-b4d72bf9f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYm9vdHMlMjBmYXNoaW9ufGVufDF8fHx8MTc2OTIyNTUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 5,
//         name: "Street Style Elite",
//         price: 169,
//         category: "casual",
//         image: "https://images.unsplash.com/photo-1759542890353-35f5568c1c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzbmVha2VycyUyMHN0eWxlfGVufDF8fHx8MTc2OTE0OTQ1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 6,
//         name: "Performance Max",
//         price: 199,
//         category: "sports",
//         image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMHNob2VzJTIwZGVzaWdufGVufDF8fHx8MTc2OTI1NTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 7,
//         name: "Marathon Elite",
//         price: 209,
//         category: "running",
//         image: "https://images.unsplash.com/photo-1661605813204-8c7662c1a5f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHJ1bm5pbmclMjBzaG9lc3xlbnwxfHx8fDE3NjkyNTUyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     },
//     {
//         id: 8,
//         name: "Heritage Classic",
//         price: 159,
//         category: "casual",
//         image: "https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwbWluaW1hbHxlbnwxfHx8fDE3NjkxNjk5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//     }
// ];