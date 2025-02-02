import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // TODO: check kr lio bhai yadd se
    const isAuthenticated = request.cookies.has("auth_token")
    const isLoginPage = request.nextUrl.pathname === "/login"

    if (!isAuthenticated && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isAuthenticated && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}