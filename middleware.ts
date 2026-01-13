import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  // Temporarily disable auth to let custom login work
  // TODO: Re-enable after testing
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
