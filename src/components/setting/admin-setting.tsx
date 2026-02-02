import { Session } from 'next-auth'
import SideBar from './Side-bar'
import { SlidersHorizontal } from 'lucide-react'

function AdminSetting({
    user,
}: {
    user: Session | null
}) {
    return (
        <>
            <SideBar />

        </>
    )
}

export default AdminSetting