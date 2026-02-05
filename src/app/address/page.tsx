import type { Metadata } from "next";
import AddressWr from '@/components/address/Adress-wr'
import React from 'react'


function page() {
    return (
        <main className='flex justify-center items-center w-screen h-screen p-0 m-0 box-border bg-hero'>
            <AddressWr />
        </main>
    )
}

export default page