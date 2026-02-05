import type { Metadata } from "next";
import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

export const metadata: Metadata = {
    title: "Login - Shoes Store | Sign In to Your Account",
    description: "Sign in to your Shoes Store account to access your orders, wishlist, and personalized recommendations.",
    robots: "noindex, nofollow",
    openGraph: {
        title: "Login - Shoes Store | Sign In",
        description: "Sign in to your Shoes Store account.",
        type: "website",
        url: "https://shoes-store.com/login",
    },
};

function page() {
    return (
        <main className='bg-hero w-screen h-screen m-0 p-0 flex justify-center items-center'>
            <LoginForm />
        </main>
    )
}

export default page