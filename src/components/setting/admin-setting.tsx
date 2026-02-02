"use client";
import { Session } from 'next-auth'
import SideBar from './Side-bar'
import { useSearchParams } from 'next/navigation'
import GeneralAdmin from './General-admin'
import ItemsAdmin from './Items-admin';
import AddAdmin from './Add-admin';
import LogAdmin from './Log-admin';

function AdminSetting({
    user,
}: {
    user: Session | null
}) {

    const params = useSearchParams()

    const link = [...params][0][1]

    return (
        <div>
            {
                link === "general" ?
                    <GeneralAdmin user={user} />
                    : link === "items" ?
                        <ItemsAdmin />
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