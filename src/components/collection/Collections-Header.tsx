'use client'

import { useAnimation } from "@/hooks/useAnimation"

function CollectionsHeader() {
    const titleVisible = useAnimation(0)
    const descriptionVisible = useAnimation(200)

    return (
        <div className="w-8/10 mx-auto relative top-30 flex flex-col justify-evenly h-30">
            <h1 className={`capitalize text-5xl md:text-6xl font-bold transition-all duration-500 ${titleVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                our
                <span className='italic'> collection</span>
            </h1>
            <p className={`text-gray-300 transition-all duration-500 ${descriptionVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>Curated for every moment</p>
        </div>
    )
}

export default CollectionsHeader