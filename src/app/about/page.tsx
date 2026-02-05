'use client'

import type { Metadata } from "next";
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useAnimation, useStaggeredAnimation } from '@/hooks/useAnimation'

export const metadata: Metadata = {
    title: "About Us - Shoes Store | Our Story & Mission",
    description: "Learn about Shoes Store's journey. Discover our commitment to quality craftsmanship, innovation, and exceptional footwear design.",
    keywords: ["about us", "our story", "craftsmanship", "footwear design", "shoe company"],
    openGraph: {
        title: "About Us - Shoes Store | Our Story & Mission",
        description: "Learn about Shoes Store's journey and commitment to quality.",
        type: "website",
        url: "https://shoes-store.com/about",
    },
};

function AboutPage() {
    // About page: presentational page with several sections that use
    // animation hooks for entrance effects. No server data is required.
    const titleVisible = useAnimation(0)
    const descriptionVisible = useAnimation(200)
    const storyVisible = useAnimation(400)
    const imageVisible = useAnimation(600)
    const valuesVisible = useStaggeredAnimation(3, 800, 150)
    const statsVisible = useStaggeredAnimation(4, 1400, 150)

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-500 ${titleVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100">Exceptional</span> Footwear
                        </h1>
                        <p className={`text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${descriptionVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            We believe that great shoes are more than just fashion&mdash;they&rsquo;re a statement of who you are. For over a decade, we&rsquo;ve been at the intersection of innovation, craftsmanship, and style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-500 ${storyVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                                Our Story
                            </h2>
                            <p className="text-zinc-300 text-lg mb-4 leading-relaxed">
                                What started as a small garage project has evolved into a global movement. Our founders believed that everyone deserves footwear that doesn&rsquo;t compromise on comfort or style. They spent years perfecting every detail&mdash;from material selection to sole engineering.
                            </p>
                            <p className="text-zinc-300 text-lg leading-relaxed">
                                Today, we&rsquo;re trusted by millions who demand more from their shoes. We&rsquo;ve stayed true to our roots: quality without compromise, innovation without gimmicks, and style that speaks for itself.
                            </p>
                        </div>
                        <div className={`relative h-96 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden transition-all duration-500 ${imageVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                            <Image
                                height={600}
                                width={600}
                                src={"https://images.unsplash.com/photo-1652474590303-b4d72bf9f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYm9vdHMlMjBmYXNoaW9ufGVufDF8fHx8MTc2OTIyNTUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
                                alt=''
                            />
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-200 opacity-20">
                                    Est. 2014
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800 bg-zinc-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className={`group p-8 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-800/80 ${valuesVisible[0] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                    <Check size={20} className="text-zinc-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Quality First</h3>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                                Every pair undergoes rigorous testing. We use premium materials sourced from the most reputable suppliers worldwide. Anything less is unacceptable.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className={`group p-8 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-800/80 ${valuesVisible[1] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                    <Check size={20} className="text-zinc-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Sustainability</h3>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                                We&rsquo;re committed to reducing our environmental footprint. Our packaging is 100% recyclable, and we&rsquo;re continuously innovating in sustainable manufacturing.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className={`group p-8 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-800/80 ${valuesVisible[2] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                    <Check size={20} className="text-zinc-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Innovation</h3>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                                We invest heavily in R&D to bring you tomorrow&rsquo;s technology today. From advanced cushioning to breathable fabrics, we&rsquo;re always pushing boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className={`text-center transition-all duration-500 ${statsVisible[0] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 mb-2">
                                12M+
                            </div>
                            <p className="text-zinc-400 text-lg">Happy Customers</p>
                        </div>
                        <div className={`text-center transition-all duration-500 ${statsVisible[1] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 mb-2">
                                50+
                            </div>
                            <p className="text-zinc-400 text-lg">Countries Served</p>
                        </div>
                        <div className={`text-center transition-all duration-500 ${statsVisible[2] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 mb-2">
                                250+
                            </div>
                            <p className="text-zinc-400 text-lg">Design Collections</p>
                        </div>
                        <div className={`text-center transition-all duration-500 ${statsVisible[3] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 mb-2">
                                98%
                            </div>
                            <p className="text-zinc-400 text-lg">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800 bg-zinc-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
                        Meet Our Team
                    </h2>
                    <p className="text-zinc-300 text-center text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
                        Our diverse team of designers, engineers, and creative minds are united by a single mission: to create footwear that inspires. With expertise spanning fashion, technology, and sustainability, we bring together the best talent in the industry.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="group">
                                <div className="h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 group-hover:border-zinc-600 transition-all mb-4 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center">
                                        <div className="text-6xl font-bold text-zinc-800">👟</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-white mb-1">Team Member</h3>
                                    <p className="text-zinc-400">Role & Expertise</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Join the Movement
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        Become part of a community that values quality, style, and innovation. Discover our latest collections and experience the difference exceptional footwear can make.
                    </p>
                    <button className="px-8 py-4 bg-white text-zinc-950 font-semibold rounded-lg hover:bg-zinc-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Explore Our Collections
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AboutPage