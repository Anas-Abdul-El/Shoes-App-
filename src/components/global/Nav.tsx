"use client";

import Link from "next/link"
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

type link = {
    id: number
    href: string
    content: string
}

const Links: Array<link> = [
    {
        id: 0,
        href: "/login",
        content: "login"
    },
    {
        id: 1,
        href: "/collections",
        content: "collections"
    },
    {
        id: 2,
        href: "/about",
        content: "about"
    },
    {
        id: 3,
        href: "/contact us",
        content: "contact us"
    },
]

function Nav() {
    const path = usePathname()
    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center w-9/11 h-15 mx-auto">
            <Link href="/" className="uppercase font-bold text-2xl cursor-pointer ">
                stride
            </Link>
            <ul className="flex md:justify-between md:w-120 justify-end capitalize">
                {
                    Links.map(ele => {
                        return <li
                            className={` hover:text-gray-300 md:block hidden ${path == ele.href && "border-b-solid border-b"}`}
                            key={ele.id}>
                            <Link href={ele.href}>{ele.content}</Link>
                        </li>
                    })
                }
                <li>
                    <Link href="/cart">
                        <ShoppingBag size={24} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav