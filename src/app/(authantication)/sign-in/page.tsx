import type { Metadata } from "next";
import { SignInForm } from '@/components/auth/sign-in-form'


function page() {
    return (
        <main className='bg-hero w-screen h-screen m-0 p-0 flex justify-center items-center'>
            <SignInForm />
        </main>
    )
}

export default page