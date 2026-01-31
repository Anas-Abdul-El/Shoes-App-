import { Session } from 'next-auth'
import React from 'react'

function AdminSetting({
    user,
}: {
    user: Session | null
}) {
    return (
        <div>adminSetting</div>
    )
}

export default AdminSetting