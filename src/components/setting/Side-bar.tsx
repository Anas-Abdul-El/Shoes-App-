"use client"
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

function SideBar() {

    const path = usePathname()

    const params = useSearchParams()

    const link = [...params][0][1]

    const links = [
        {
            id: 0,
            content: "general",
            link: path + "?link=general",
        },
        {
            id: 1,
            content: "items",
            link: path + "?link=items"
        },
        {
            id: 2,
            content: "admins",
            link: path + "?link=admins"
        },
        {
            id: 3,
            content: "log",
            link: path + "?link=log"
        },
    ]

    const [isClicked, setClick] = useState<boolean>(false)

    const handleClick = () => {
        setClick(!isClicked)
    }

    return (
        <>
            <div className='fixed sm:top-6 top-15 left-6 cursor-pointer z-30' onClick={handleClick}>
                <SlidersHorizontal />
            </div>
            <nav
                inert={!isClicked}
                className={` sm:w-60 h-screen  py-20 bg-black transition-all
                 ${isClicked ? "transform-[translateX(0px)]" : "sm:transform-[translateX(-240px)] transform-[translateX(-410px)]"}`}>
                <div className='w-9/10 h-full flex items-start flex-col mx-auto'>
                    <div className='w-full p-3 flex flex-col space-y-10 text-white'>

                        {
                            links.map(e => {
                                return <div key={e.id} className={`h-10 w-full border-b  ${link === e.content ? "border-white" : "border-[rgb(255,255,255,0.2)]"}`}>
                                    <Link href={e.link} className='ml-2 capitalize'>{e.content}</Link>
                                </div>
                            })
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SideBar