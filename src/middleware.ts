import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

// Utils
import createToast from './utils/createToast';
import { getAuthToken } from './utils/getAuthToken';

export default async function middleware(request: NextRequest) {
    const urlPath = request.nextUrl.pathname;
    const authToken = await getAuthToken();

    if (urlPath.startsWith('/dashboard')) {
        if (authToken === undefined || !authToken) {
            createToast('error', 'Login expired!');
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    if (urlPath === '/') {
        if (authToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/dashboard/:path*', '/']
}