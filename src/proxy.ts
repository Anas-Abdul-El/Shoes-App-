import { auth } from "./lib/auth"
import { NextRequest, NextResponse } from "next/server"
import {
    protectedRoutes,
    unprotectedRoutes,
    API_AURH_ROUTE,
    authRoutes,
    adminRoutes
} from "../route"

async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isLogin = await auth()
    const role = isLogin?.role

    const isAuthRoutes = authRoutes.includes(path)
    const isApiAuthRoute = (API_AURH_ROUTE === path)
    const isProtectedRoutes = protectedRoutes.includes(path)
    const isUnprotectedRoutes = unprotectedRoutes.includes(path)
    const isAdminRoutes = adminRoutes.includes(path)

    if (isUnprotectedRoutes || isApiAuthRoute) return NextResponse.next()

    if (isAuthRoutes && !isLogin) {
        return NextResponse.next()
    } else if (isAuthRoutes && isLogin) {
        return NextResponse.redirect(new URL("/", "http://localhost:3000"))
    }

    if (isProtectedRoutes && isLogin) {
        return NextResponse.next()
    } else if (isProtectedRoutes && !isLogin) {
        return NextResponse.redirect(new URL("/login", "http://localhost:3000"))
    }

    // if (isAdminRoutes && role === "USER") {
    //     return NextResponse.redirect(new URL("/", "http://localhost:3000"))
    // } else if (isAdminRoutes && role === "ADMIN") {
    //     return NextResponse.next()
    // }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}

export default middleware