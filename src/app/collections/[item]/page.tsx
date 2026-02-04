import ItemsWr from '@/components/collection/items/Items-wr';
import { findProductsById } from "@/../utils/prisma-function";

async function page({
    params
}: {
    params: { item: string }
}) {
    // Dynamic collection item page. Loads a single product by id via
    // `findProductsById` (Prisma helper) and renders the client
    // `ItemsWr` detail component. Returns `null` if no id is provided.
    const { item } = await params;

    if (!item) return null;
    const product = await findProductsById(item);


    return (
        <main className="w-screen h-screen m-0 p-0 box-border overflow-x-hidden flex justify-center md:items-center items-end">
            <ItemsWr product={product} />
        </main>
    )
}

export default page