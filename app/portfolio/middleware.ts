import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  const res = NextResponse.next()

  const supabase = createMiddlewareClient({

    req,
    res

  })

  const {

    data: { session }

  } = await supabase.auth.getSession()

  // PROTECTED ROUTES
  const protectedRoutes = [

    '/journal',
    '/ledger',
    '/portfolio',
    '/analytics'

  ]

  const isProtected = protectedRoutes.some(

    (route) =>

      req.nextUrl.pathname.startsWith(route)

  )

  // IF USER NOT LOGGED IN
  if (isProtected && !session) {

    return NextResponse.redirect(

      new URL('/auth', req.url)

    )

  }

  return res

}

export const config = {

  matcher: [

    '/journal/:path*',

    '/ledger/:path*',

    '/portfolio/:path*',

    '/analytics/:path*'

  ]

}