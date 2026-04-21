import { createMiddlewareClient } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = new Set(['/'])
const RESERVED_SUBDOMAINS = new Set(['www', 'api', 'super-admin'])

function getSubdomainFromHost(host: string, rootDomain: string) {
	const normalizedHost = host.split(':')[0].toLowerCase()

	if (!normalizedHost.endsWith(rootDomain)) {
		return null
	}

	const potentialSubdomain = normalizedHost
		.slice(0, -rootDomain.length)
		.replace(/\.$/, '')

	if (!potentialSubdomain || RESERVED_SUBDOMAINS.has(potentialSubdomain)) {
		return null
	}

	return potentialSubdomain
}

function isProtectedPath(pathname: string) {
	if (PUBLIC_PATHS.has(pathname)) {
		return false
	}

	if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
		return false
	}

	return true
}

export async function middleware(request: NextRequest) {
	const url = request.nextUrl
	const host = request.headers.get('host') ?? ''
	const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'vora.su'
	const subdomain = getSubdomainFromHost(host, rootDomain)

	const { supabase, response } = createMiddlewareClient(request)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const pathname = url.pathname
	const isSuperAdminPath = pathname.startsWith('/super-admin')

	if (isProtectedPath(pathname) && !user) {
		const redirectUrl = new URL('/login', request.url)
		redirectUrl.searchParams.set('next', pathname)
		return NextResponse.redirect(redirectUrl)
	}

	if (isSuperAdminPath && user) {
		const role = (user.app_metadata?.role as string | undefined) ?? 'staff'

		if (role !== 'super_admin') {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	if (subdomain && !pathname.startsWith(`/${subdomain}`)) {
		const rewriteUrl = request.nextUrl.clone()
		rewriteUrl.pathname = `/${subdomain}${pathname}`
		return NextResponse.rewrite(rewriteUrl)
	}

	return response
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
