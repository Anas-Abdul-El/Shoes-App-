import type { Metadata } from "next";
import HeroSection from '@/components/hero-section/Hero-Section'

export const metadata: Metadata = {
    title: "Home - Shoes Store | Premium Footwear",
    description: "Welcome to Shoes Store. Browse our exclusive collection of premium shoes and find the perfect pair for any occasion.",
    openGraph: {
        title: "Home - Shoes Store | Premium Footwear",
        description: "Welcome to Shoes Store. Browse our exclusive collection of premium shoes.",
        type: "website",
        url: "https://shoes-store.com",
    },
};

// Home page - lightweight server component that renders the top-level
// `HeroSection` presentational component. Keeps the page minimal and
// defers interactions to client components inside the hero.
function page() {
    return (
        <>
            <main className="bg-hero w-screen h-screen m-0 p-0 box-border overflow-hidden">
                <HeroSection />
            </main>
        </>
    )
}

export default page