"use client"
import { Session } from 'next-auth'
import { Input } from '../ui/input'
import { useState, useTransition } from 'react'
import { changeTheName } from '../../../server/change-the-name'
import { changeThePassword } from '../../../server/change-the-password'
import { Button } from '../ui/button'
import { signOutFromAcc } from '../../../server/sign-out'

function UserSetting({
    user,
}: {
    user: Session | null
}) {
    const [nameValue, setNameValue] = useState<string>("")
    const [oldPassValue, setOldPassValue] = useState<string>("")
    const [passValue, setPassValue] = useState<string>("")

    const [passMessage, setPassMessage] = useState({ message: "", type: "" })
    const [nameMessage, setNameMessage] = useState({ message: "", type: "" })

    // Local transition state for server actions
    const [isPendding, setTransitive] = useTransition()

    if (!user || !user.user?.name) return null;

    if (nameValue === "") setNameValue(user?.user?.name)

    const handleNameChange = () => {
        setTransitive(() => {
            changeTheName(nameValue)
                .then(msg => setNameMessage(msg))
        })
    }

    const handlePassChange = () => {
        setTransitive(() => {
            changeThePassword({ newPass: passValue, oldPass: oldPassValue })
                .then(msg => setPassMessage(msg))
        })
    }


    return (
        <>
            <div className='h-8/10 w-8/10 bg-zinc-900 rounded-2xl border border-black border-solid shadow-xl flex flex-col sm:space-y-10 space-y-15'>
                <div className='w-9/10 h-25 mx-auto flex items-center border-b border-solid border-[rgba(255,255,255,0.1)] px-5'>
                    <h1 className='capitalize text-4xl '>settings</h1>
                </div>
                <div className='w-8/10 sm:h-20 h-fit mx-auto flex flex-col items-start space-y-3 capitalize'>
                    <p className='cursor-pointer'>change the name</p>
                    <div className='flex space-x-3 sm:w-1/2 sm:flex-row flex-col space-y-3'>
                        <Input
                            type='text'
                            value={nameValue}
                            className='sm:w-1/2 w-full dark'
                            onChange={(e) => setNameValue(e.currentTarget.value)} />
                        <Button
                            variant={"default"}
                            className='dark'
                            disabled={isPendding}
                            onClick={handleNameChange}>change</Button>
                    </div>
                    <p className={nameMessage.type === "error" ? "text-destructive" : "text-green-500"}>{nameMessage.message}</p>
                </div>
                <div className='w-8/10 sm:h-20 h-fit mx-auto flex flex-col items-start space-y-3 capitalize'>
                    <p className='cursor-pointer'>change the password</p>
                    <div className='flex space-x-5 sm:w-1/2 sm:flex-row flex-col space-y-4'>
                        <Input
                            type='password'
                            value={oldPassValue}
                            className='w-full sm:w-1/2 dark'
                            placeholder='Write the old password'
                            onChange={e => setOldPassValue(e.currentTarget.value)} />
                        <Input
                            type='password'
                            value={passValue}
                            className='w-full sm:w-1/2 dark'
                            placeholder='Write the new password'
                            onChange={e => setPassValue(e.currentTarget.value)} />
                        <Button
                            variant={"default"}
                            className='dark'
                            disabled={isPendding}
                            onClick={handlePassChange}>change</Button>
                    </div>
                    <p className={passMessage.type === "error" ? "text-destructive" : "text-green-500"}>{passMessage.message}</p>
                </div>
                <div className='w-8/10 h-20 mx-auto flex items-center'>
                    <p
                        onClick={signOutFromAcc}
                        className='text-red-500 cursor-pointer'>Logout from your account</p>
                </div>
            </div>
        </>
    )
}

export default UserSetting