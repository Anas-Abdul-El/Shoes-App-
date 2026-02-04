'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addItemSchema, type AddItemSchemaType } from "@/../schemas/form-schema"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState } from 'react'
import { createProduct } from '../../../../server/create-product'
import { useTransition } from 'react'
import { set } from 'zod'

function AddItemsWr() {
    // Component for adding a new product. Handles image preview locally
    // and submits a server action `createProduct` with validated values.
    const [preview, setPreview] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const form = useForm<AddItemSchemaType>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
            name: '',
            description: '',
            price: "",
            quantity: "",
            category: 'RUNNING',
            imageUrl: '',
        },
    })

    function onSubmit(values: AddItemSchemaType) {
        console.log('Form values:', values)
        startTransition(() => {
            createProduct({ ...values, price: Number(values.price), quantity: Number(values.quantity), imageUrl: preview || "" })
                .then(res => {
                    console.log(res.message)
                })
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setPreview(file ? URL.createObjectURL(file) : null)
    }

    return (
        <div className="bg-zinc-900 w-full md:w-7/10 md:h-140 h-full sm:h-9/10 rounded-lg flex m-0 sm:p-0 p-5 pt-20">
            <div className="bg-zinc-900 w-full md:h-130 h-9/10 rounded-lg flex sm:flex-row flex-col m-0">
                {/* Image Upload Section */}
                <div className="sm:h-full sm:w-4/10 w-full h-4/10 p-2 flex flex-col">
                    <label htmlFor="image-upload" className="flex items-center justify-center flex-1 border-2 border-gray-500 border-dashed rounded-2xl cursor-pointer hover:bg-zinc-800 transition">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">Upload Image</span>
                        )}
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    {form.formState.errors.imageUrl && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.imageUrl.message}</p>
                    )}
                </div>

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

export default AddItemsWr
