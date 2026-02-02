"use client";
import { Session } from 'next-auth'
import SideBar from './Side-bar'
import { useSearchParams } from 'next/navigation'
import GeneralAdmin from './General-admin'
import ItemsAdmin from './Items-admin';
import AddAdmin from './Add-admin';
import LogAdmin from './Log-admin';

type Category = "RUNNING" | "CASUAL" | "SPORTS" | "BOOTS";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    category: Category;
    quantity: number | null;
    imageUrl: string;
}

type Products = Product[]

function AdminSetting({
    user,
    products,
}: {
    user: Session | null
    products: Products
}) {


    const params = useSearchParams()

    const link = [...params][0][1]

    return (
        <div>
            {
                link === "general" ?
                    <GeneralAdmin user={user} />
                    : link === "items" ?
                        <ItemsAdmin products={products} />
                        : link === "admin" ?
                            <AddAdmin />
                            : (link === "log" &&
                                <LogAdmin />
                            )
            }

            <SideBar />
        </div>
    )
}

export default AdminSetting