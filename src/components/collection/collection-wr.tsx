
import CollectionsContect from './Collections-Contect'
import CollectionsHeader from './Collections-Header'
import prisma from "@/lib/prisma";

async function CollectionsWr() {

    // Server component that loads products from the database and
    // renders the collection header and content components.
    const products = await prisma.product.findMany();

    return (
        <>
            <CollectionsHeader />

            <CollectionsContect products={products} />
        </>
    )
}

export default CollectionsWr