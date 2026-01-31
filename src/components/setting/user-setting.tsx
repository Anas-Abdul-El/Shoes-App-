import { Session } from 'next-auth'

function UserSetting({
    user,
}: {
    user: Session | null
}) {
    return (
        <div>userSetting</div>
    )
}

export default UserSetting