"use client"
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

// SideBar: a small settings sidebar used in the admin/settings pages.
// - Toggles open/closed with a button (mobile-first behaviour).
// - Reads the `link` query parameter to determine which section is active.
// - Renders navigation links for each settings subsection.

function SideBar() {

    // Current pathname (e.g. `/setting`) used to build section URLs
    const path = usePathname()

    // URL search params (iterator-like) provided by Next.js navigation
    const params = useSearchParams()

    // Read the first query param value (assumes `?link=...`).
    // This code expects the `link` parameter to be present and first.
    const link = [...params][0][1]

    // Sections rendered in the sidebar. Each item contains an id, display
    // content and a target link built from the current `path`.
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

    // Local UI state: whether the sidebar is open (true) or closed (false)
    const [isClicked, setClick] = useState<boolean>(false)

    // Toggle the sidebar open/closed
    const handleClick = () => {
        setClick(!isClicked)
    }

    return (
        <>
            {/* Button to toggle the sidebar visibility */}
            <div className='fixed sm:top-6 top-15 left-6 cursor-pointer z-30' onClick={handleClick}>
                <SlidersHorizontal />
            </div>
            {/*
                            Sidebar container:
                            - `inert` disables interaction when closed.
                            - CSS transform slides the panel in/out based on `isClicked`.
            */}
            <nav
                inert={!isClicked}
                className={` sm:w-60 h-screen  py-20 bg-black transition-all
                                 ${isClicked ? "transform-[translateX(0px)]" : "transform-[translateX(-510px)]"}`}>
                <div className='w-9/10 h-full flex items-start flex-col mx-auto'>
                    <div className='w-full p-3 flex flex-col space-y-10 text-white'>

                        {
                            // Render each link and highlight the active section
                            links.map(e => {
                                return <div key={e.id} className={`h-10 w-full border-b  ${link === e.content ? "border-white" : "border-[rgb(255,255,255,0.2)]"}`}>
                                    <Link href={e.link} className='ml-2 capitalize' onClick={() => setClick(false)}>{e.content}</Link>
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