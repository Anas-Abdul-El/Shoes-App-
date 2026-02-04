'use client'

import { useAnimation } from "@/hooks/useAnimation";
import ButtonToCollection from "./Button-to-collection";


function HeroSection() {
    // Hero section with staggered entrance animations for title,
    // description and call-to-action button using `useAnimation`.
    const titleVisible = useAnimation(0)
    const descriptionVisible = useAnimation(200)
    const buttonVisible = useAnimation(400)

    return (
        <section className="relative top-20 md:h-8/10 h-6/10 w-9/11 mx-auto flex flex-col justify-evenly ">
            <div className="flex flex-col justify-evenly lg:h-100 h-60">
                <h1 className={`capitalize text-5xl sm:text-7xl lg:text-9xl font-bold transition-all duration-500 ${titleVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                    Beyond
                    <br />
                    <span className="italic">Performance</span>
                </h1>
                <p className={` max-w-120 text-gray-200 transition-all duration-500 ${descriptionVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                    Experience the future of footwear. Where cutting-edge technology meets style.
                </p>
            </div>
            <div className={`transition-all duration-500 ${buttonVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                <ButtonToCollection />
            </div>
        </section>
    )
}

export default HeroSection