"use click"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { redirect } from "next/navigation"



function EmptyCart() {
    // Simple presentational empty-cart view that prompts user to explore
    // collections. Uses the Empty primitives for consistent styling.
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <ShoppingCart />
                </EmptyMedia>
                <EmptyTitle>Cart is empty</EmptyTitle>
                <EmptyDescription>No Products here</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={() => redirect("/collections")}>explore collection</Button>
            </EmptyContent>
        </Empty>
    )
}

export default EmptyCart