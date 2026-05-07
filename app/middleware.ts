import { NextResponse }

from 'next/server'

import type { NextRequest }

from 'next/server'

export function middleware(

  request: NextRequest

) {

  // SUPABASE TOKEN
  const token = request.cookies.get(

    'sb-access-token'

  )

  // PROTECTED ROUTES
  const protectedRoutes = [

    '/dashboard',

    '/journal',

    '/portfolio',

    '/ledger',

    '/analytics',

    '/tradingview'

  ]

  // CHECK ROUTE
  const isProtectedRoute =

    protectedRoutes.some((route) =>

      request.nextUrl.pathname.startsWith(

        route

      )

    )

  // REDIRECT TO LOGIN
  if (

    isProtectedRoute &&

    !token

  ) {

    return NextResponse.redirect(

      new URL('/auth', request.url)

    )

  }

  // ALLOW ACCESS
  return NextResponse.next()

}

// MATCHER
export const config = {

  matcher: [

    '/dashboard/:path*',

    '/journal/:path*',

    '/portfolio/:path*',

    '/ledger/:path*',

    '/analytics/:path*',

    '/tradingview/:path*'

  ]

}