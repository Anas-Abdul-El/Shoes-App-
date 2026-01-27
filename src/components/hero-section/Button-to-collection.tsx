"use client"
import { redirect } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

function ButtonToCollection() {
    return (
        <>
            <div>
                <Button
                    variant={"outline"}
                    onClick={() => redirect("/collections")}
                    className="w-85 h-15 rounded-none border border-black group"
                >
                    <p className="capitalize text-black">explore collection</p>
                    <ArrowRight color="black" size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </>
    )
}

export default ButtonToCollection