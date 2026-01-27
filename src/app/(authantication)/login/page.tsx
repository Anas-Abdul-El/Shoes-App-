import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

function page() {
    return (
        <main className='bg-hero w-screen h-screen m-0 p-0 flex justify-center items-center'>
            <LoginForm />
        </main>
    )
}

export default page