import EditItemsWr from '@/components/setting/editItems/edit-items-wr'
import prisma from '@/lib/prisma';
import React from 'react'

async function page({ params }: { params: { items: string } }) {

    const itemId = (await params).items;

    const product = await prisma.product.findUnique({
        where: { id: itemId }
    })

    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <EditItemsWr product={product} />
        </div>
    )
}

export default page