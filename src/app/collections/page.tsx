import type { Metadata } from "next";
import CollectionsWr from "@/components/collection/collection-wr"

export const metadata: Metadata = {
    title: "Collections - Shoes Store | Shop All Shoes",
    description: "Browse our complete collection of premium shoes. Find the perfect style, comfort, and quality for your lifestyle.",
    keywords: ["collections", "shop", "shoes", "all shoes", "shoe styles", "sneakers", "boots"],
    openGraph: {
        title: "Collections - Shoes Store | Shop All Shoes",
        description: "Browse our complete collection of premium shoes.",
        type: "website",
        url: "https://shoes-store.com/collections",
    },
};

// Collections listing page. The `CollectionsWr` server component loads
// products and renders the collection grid. Keeping data-fetching in
// the wrapper allows the UI components to remain mostly presentational.
function page() {
    return (
        <main className="w-screen h-screen m-0 p-0 box-border overflow-x-hidden">
            <CollectionsWr />
        </main>
    )
}

export default page