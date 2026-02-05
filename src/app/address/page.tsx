import type { Metadata } from "next";
import AddressWr from '@/components/address/Adress-wr'
import React from 'react'

export const metadata: Metadata = {
    title: "Delivery Address - Shoes Store | Checkout",
    description: "Add or update your delivery address for order checkout. Fast and secure shipping.",
    robots: "noindex, nofollow",
    openGraph: {
        title: "Delivery Address - Shoes Store",
        description: "Add or update your delivery address for order checkout.",
        type: "website",
        url: "https://shoes-store.com/address",
    },
};

function page() {
    return (
        <main className='flex justify-center items-center w-screen h-screen p-0 m-0 box-border bg-hero'>
            <AddressWr />
        </main>
    )
}

export default page