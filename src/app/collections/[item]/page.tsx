import type { Metadata } from "next";
import ItemsWr from '@/components/collection/items/Items-wr';
import { findProductsById } from "@/../utils/prisma-function";

export async function generateMetadata({ params }: { params: { item: string } }): Promise<Metadata> {
    const { item } = await params;

    if (!item) {
        return {
            title: "Product - Shoes Store",
            description: "View product details at Shoes Store",
        };
    }

    const product = await findProductsById(item);

    if (!product) {
        return {
            title: "Product Not Found - Shoes Store",
            description: "The product you're looking for doesn't exist.",
        };
    }

    return {
        title: `${product.name} - Shoes Store | Premium Footwear`,
        description: product.description || `Shop ${product.name} at Shoes Store. High-quality premium footwear.`,
        keywords: [product.name, "shoes", "footwear", "premium", product.category || "shoes"],
        openGraph: {
            title: `${product.name} - Shoes Store`,
            description: product.description || `Shop ${product.name} at Shoes Store.`,
            type: "website",
            url: `https://shoes-store.com/collections/${item}`,
            images: product.imageUrl ? [
                {
                    url: product.imageUrl,
                    width: 800,
                    height: 600,
                    alt: product.name,
                    type: "image/jpeg",
                },
            ] : [],
        },
    };
}

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