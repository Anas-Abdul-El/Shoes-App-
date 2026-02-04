import HeroSection from '@/components/hero-section/Hero-Section'

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