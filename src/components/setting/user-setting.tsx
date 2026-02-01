"use client"
import { Session } from 'next-auth'
import { Input } from '../ui/input'
import { useState } from 'react'

function UserSetting({
    user,
}: {
    user: Session | null
}) {

    if (!user || !user.user?.name) return null;

    const [nameValue, setNameValue] = useState<string>(user?.user?.name)
    const [passValue, setPassValue] = useState<string>("")

    return (
        <>
            <div className='h-8/10 w-8/10 bg-zinc-900 rounded-2xl border border-black border-solid shadow-xl flex flex-col space-y-10'>
                <div className='w-9/10 h-25 mx-auto flex items-center border-b border-solid border-[rgba(255,255,255,0.1)] px-5'>
                    <h1 className='capitalize text-4xl '>settings</h1>
                </div>
                <div className='w-8/10 h-20 mx-auto flex flex-col items-start space-y-3 capitalize'>
                    <p className='cursor-pointer'>change the name</p>
                    <Input
                        type='text'
                        value={nameValue}
                        className='w-5/10 dark'
                        onChange={(e) => setNameValue(e.currentTarget.value)} />
                </div>
                <div className='w-8/10 h-20 mx-auto flex flex-col items-start space-y-3 capitalize'>
                    <p className='cursor-pointer'>change the password</p>
                    <Input
                        type='password'
                        value={passValue}
                        className='w-5/10 dark'
                        placeholder='Write the new password'
                        onChange={(e) => setPassValue(e.currentTarget.value)} />
                </div>
                <div className='w-8/10 h-20 mx-auto flex items-center capitalize'>
                    <p
                        onClick={() => { }}
                        className='text-red-500 cursor-pointer'>Logout from your accaount</p>
                </div>
            </div>
        </>
    )
}

export default UserSetting