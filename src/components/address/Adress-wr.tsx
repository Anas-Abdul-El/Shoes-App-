"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addressSchema, type AddressSchemaType } from "../../../schemas/form-schema"
import { Plus, X } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"
import { addAdress } from "../../../server/add-address"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



export default function AddressWr() {

    const form = useForm<AddressSchemaType>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            street: "",
            city: "",
            state: "",
            zipCode: 0,
            country: "",
        },
    })

    const [error, setError] = useState<string | null>()
    const [isLoading, startTransition] = useTransition()


    function onSubmit(values: AddressSchemaType) {
        startTransition(() => {
            addAdress(values)
                .then(res => setError(res))
        })
    }


    return (
        <Card className="w-170 max-w-md dark ">
            <CardHeader>
                <CardTitle>Adress</CardTitle>
                <CardDescription>
                    Please enter your address to continue. This is a one-time setup.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex space-x-6">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="street"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="city"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex space-x-6">
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your state"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your zip code"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your country"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            error &&
                            <div className="border-destructive border p-1">
                                <p className="text-red-500 ml-2">{error}</p>
                            </div>
                        }
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            <div className=" h-full flex justify-center items-center space-x-1 ">
                                <Plus />
                                <p>Add</p>
                            </div>
                        </Button>
                    </form>
                </Form>
                <CardFooter>
                    <div className=" my-5 text-sm text-center ">
                        <Link href="/cart" className="hover:underline text-white flex">
                            <p className="font-bold">Back to cart</p>
                        </Link>
                    </div>
                </CardFooter>
            </CardContent>
        </Card >
    )
}


