// middleware.ts 
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // Define protected routes
  const protectedRoutes = [
    '/dashboard',
    '/planning',
    '/community/create',
    '/premium',
    '/settings',
    '/api/comparisons',
    '/api/premium'
  ]

  // Define premium-only routes
  const premiumRoutes = [
    '/planning',
    '/community',
    '/premium',
    '/api/premium'
  ]

  // Define admin routes (if any)
  const adminRoutes = [
    '/admin'
  ]

  const pathname = request.nextUrl.pathname

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  const isPremiumRoute = premiumRoutes.some(route =>
    pathname.startsWith(route)
  )

  const isAdminRoute = adminRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated, check premium status for premium routes
  if (session && isPremiumRoute) {
    try {
      const { data: user } = await supabase
        .from('users')
        .select('subscription_tier, subscription_end_date')
        .eq('id', session.user.id)
        .single()

      if (user) {
        const isPremium = user.subscription_tier !== 'free'
        const isSubscriptionActive = user.subscription_end_date ?
          new Date(user.subscription_end_date) > new Date() :
          isPremium

        // Redirect to upgrade page if not premium
        if (!isPremium || !isSubscriptionActive) {
          const upgradeUrl = new URL('/upgrade', request.url)
          upgradeUrl.searchParams.set('feature', pathname.split('/')[1])
          return NextResponse.redirect(upgradeUrl)
        }
      }
    } catch (error) {
      console.error('Error checking premium status in middleware:', error)
      // In case of error, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Check admin access (corporate tier)
  if (session && isAdminRoute) {
    try {
      const { data: user } = await supabase
        .from('users')
        .select('subscription_tier')
        .eq('id', session.user.id)
        .single()

      if (user?.subscription_tier !== 'corporate') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      console.error('Error checking admin status in middleware:', error)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (session && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Add CSP header for security
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com; style-src 'self' 'unsafe-inline' https://api.mapbox.com; img-src 'self' data: https://*.supabase.co https://api.mapbox.com; connect-src 'self' https://*.supabase.co https://api.mapbox.com https://events.mapbox.com wss://*.supabase.co;"
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}