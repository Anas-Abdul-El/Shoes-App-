"use client";

import Link from "next/link"
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAnimation } from "@/hooks/useAnimation";
import { Session } from "next-auth";
import { User } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";


type link = {
    id: number
    href: string
    content: string | null | undefined
}



function Nav({
    user,
}: {
    user: Session | null
}) {

    const name = user?.user?.name
    const login = user ? ({
        id: 0,
        href: "/setting?link=general",
        content: ""
    }) : ({
        id: 0,
        href: "/login",
        content: "login"
    })

    const Links: Array<link> = [
        login,
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
            href: "/contact",
            content: "contact us"
        },
    ]

    const path = usePathname()
    const navVisible = useAnimation(0)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center  h-15 mx-auto transition-all w-9/11 duration-500 ${navVisible ? 'animate-slide-up opacity-100' : 'opacity-0 -translate-y-2'}`}>
                <Link href="/" className="uppercase font-bold text-2xl cursor-pointer hover:opacity-80 transition-opacity">
                    stride
                </Link>
                <ul className="md:justify-between md:flex hidden md:w-120 justify-end capitalize">
                    {
                        Links.map((ele, index) => {
                            return <li
                                key={ele.id}
                                className={`hover:text-gray-300 transition-all duration-500 
                                ${index === 0 ? 'animation-delay-100' : index === 1 ? 'animation-delay-200' : index === 2 ? 'animation-delay-300' : 'animation-delay-400'} 
                                ${navVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                                ${(user && index === 0) && "font-bold "} `}
                            >
                                <Link href={ele.href} className={`${(path == ele.href && !(user && index === 0)) && "border-b-solid border-b"} flex items-center space-x-1`}>
                                    {
                                        (user && index === 0) && (
                                            <div className="border-2 border-solid rounded-full p-1">
                                                <User size={20} />
                                            </div>
                                        )
                                    }
                                    <p>{ele.content}</p>
                                </Link>
                            </li>
                        })
                    }
                    <li className={`transition-all duration-500 animation-delay-500 ${navVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <Link href="/cart" className="hover:opacity-80 transition-opacity">
                            <ShoppingBag size={24} />
                        </Link>
                    </li>
                </ul>
            </nav>
            <ul className={`md:hidden flex h-full flex-col bg-zinc-900 w-full fixed top-0 right-0 z-55 capitalize p-8 pt-30 space-y-15 text-2xl  transition-transform duration-500 ${mobileMenuOpen ? 'transform-[translateX(0px)]' : 'transform-[translateX(100%)]'}`}>
                {
                    Links.map((ele, index) => {
                        return <li
                            key={ele.id}
                            className={`hover:text-gray-300 transition-all duration-500 
                                ${(user && index === 0) && "font-bold "} `}
                        >
                            <Link href={ele.href} className={`${(path == ele.href && !(user && index === 0)) && "border-b-solid border-b"} flex items-center space-x-1`} onClick={() => setMobileMenuOpen(false)}>
                                {
                                    (user && index === 0) && (
                                        <div className="border-2 border-solid rounded-full p-1">
                                            <User size={20} />
                                        </div>
                                    )
                                }
                                <p>{ele.content}</p>
                            </Link>
                        </li>
                    })
                }
                <li className={`transition-all duration-500 animation-delay-500 ${navVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <Link href="/cart" className="hover:opacity-80 transition-opacity">
                        <ShoppingBag size={24} />
                    </Link>
                </li>
            </ul>
            <Menu size={24} className="cursor-pointer fixed top-0 right-0 m-4 z-60 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </>
    )
}

export default Nav