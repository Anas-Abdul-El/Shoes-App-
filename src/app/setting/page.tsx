import type { Metadata } from "next";
import AdminSetting from '@/components/setting/Admin-setting'
import UserSetting from '@/components/setting/User-setting'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'


async function page() {
    // Settings page: determines whether the current user is a regular
    // user or an admin, loads necessary data (products and activity
    // logs) and renders either the `UserSetting` or `AdminSetting` UI.
    const user = await auth()

    if (!user || !user.role) return null

    const role = user.role.toLowerCase()

    const products = await prisma.product.findMany()

    const activityLogs = await prisma.activityLog.findMany({
        include: {
            user: true,
            order: {
                include: {
                    orderItems: true
                }
            }
        },
    })

    return (
        <div className="h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            {
                role === "user" ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <UserSetting user={user} />
                    </div>
                ) : (
                    <AdminSetting user={user} products={products} activityLogs={activityLogs} />
                )
            }
        </div>
    )
}

export default page