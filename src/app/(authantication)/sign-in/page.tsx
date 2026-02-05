import type { Metadata } from "next";
import { SignInForm } from '@/components/auth/sign-in-form'

export const metadata: Metadata = {
    title: "Sign Up - Shoes Store | Create Your Account",
    description: "Create a new Shoes Store account to enjoy exclusive benefits, faster checkout, and personalized shopping experience.",
    robots: "noindex, nofollow",
    openGraph: {
        title: "Sign Up - Shoes Store | Create Account",
        description: "Create a new Shoes Store account today.",
        type: "website",
        url: "https://shoes-store.com/sign-in",
    },
};

function page() {
    return (
        <main className='bg-hero w-screen h-screen m-0 p-0 flex justify-center items-center'>
            <SignInForm />
        </main>
    )
}

export default page