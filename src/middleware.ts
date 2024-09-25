import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host");
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

    // If subdomain exists
    const customSubDomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  if (
    url.pathname === "/" ||
    (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }

  if (isProtectedRoute(req)) {
    await auth().protect();
  }
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};