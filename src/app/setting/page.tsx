
import AdminSetting from '@/components/setting/Admin-setting'
import UserSetting from '@/components/setting/User-setting'
import { auth } from '@/lib/auth'

async function page() {

    const user = await auth()

    if (!user || !user.role) return null

    const role = user.role.toLowerCase()

    return (
        <div className="h-screen w-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            {
                role !== "user" ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <UserSetting user={user} />
                    </div>
                ) : (
                    <AdminSetting user={user} />
                )
            }
        </div>
    )
}

export default page