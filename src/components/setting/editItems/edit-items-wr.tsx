'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editItemSchema, type EditItemSchemaType } from "@/../schemas/form-schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState, useTransition } from 'react'
import { Category } from '@/app/generated/prisma/browser'
import { editItem } from '../../../../server/edit-item'
import { redirect } from 'next/navigation'

type Product = {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    oldPrice: number;
    category: Category;
    imageUrl: string;
} | null

function EditItemsWr({
    product
}: {
    product: Product
}) {
    // Edit form wrapper for updating an existing product.
    // Prefills fields from the provided `product` prop and calls the
    // `editItem` server action on submit.
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)

    const form = useForm<EditItemSchemaType>({
        resolver: zodResolver(editItemSchema),
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price.toString() || "",
            quantity: product?.quantity.toString() || "",
            category: product?.category || 'RUNNING',
        },
    })

    function onSubmit(values: EditItemSchemaType) {
        console.log('Form values:', values)
        startTransition(() => {
            editItem({
                ...values,
                id: product?.id as string,
                price: Number(values.price),
                quantity: Number(values.quantity),
                imageUrl: product?.imageUrl as string
            }).then(res => {
                if (res.type === "done")
                    redirect('/setting?link=items')
                else
                    setMessage(res.message)
            })
        })
    }



    return (
        <div className="bg-zinc-900 w-full md:w-7/10 md:h-140 h-full sm:h-9/10 rounded-lg flex m-0 sm:p-0 p-5 pt-20">
            <div className="bg-zinc-900 w-full md:h-130 h-9/10 rounded-lg flex sm:flex-row flex-col m-0">

                {/* Form Fields Section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full ms:w-6/10 w-9/10 p-4 flex flex-col space-y-4 ms:ml-8 flex-1">
                        {/* Product Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter item name"
                                            {...field}
                                            className="p-4 border-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder="Enter item description"
                                            {...field}
                                            className="w-full h-50 p-2 rounded-md resize-none bg-zinc-800 text-white border border-zinc-700"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
                                        >
                                            <option value="RUNNING">Running</option>
                                            <option value="CASUAL">Casual</option>
                                            <option value="SPORTS">Sports</option>
                                            <option value="BOOTS">Boots</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price and Quantity */}
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter price"
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                className="border-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter quantity"
                                                type="number"
                                                {...field}
                                                className="border-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {message && (
                            <div className="mt-4 p-2 bg-zinc-800 text-white rounded-md">
                                {message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                variant="default"
                                disabled={isPending}
                                className="bg-black p-5 cursor-pointer hover:bg-zinc-700 w-full sm:w-auto"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default EditItemsWr
