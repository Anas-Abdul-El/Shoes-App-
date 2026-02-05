import type { Metadata } from "next";
import CollectionsWr from "@/components/collection/collection-wr"


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