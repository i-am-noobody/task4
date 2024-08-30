// middleware.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const Jwt_secret = "ab123"; // Your JWT secret

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token, Jwt_secret);
    return NextResponse.next(); // Allow the request to continue
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect if the token is invalid
  }
}

export const config = {
  matcher: '/dashboard/:path*', // Protect all routes under /dashboard
};
