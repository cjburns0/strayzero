import { clerkMiddleware } from '@/utils/clerk/middleware';
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

async function middleware(request: NextRequest) {
  // First run Clerk middleware
  const clerkResponse = await clerkMiddleware()(request);
  
  // Then run Supabase middleware
  const supabaseResponse = await createClient(request);
  
  // Return Clerk response if it's a redirect or has specific headers
  if (clerkResponse.status !== 200 || clerkResponse.headers.get('x-middleware-rewrite')) {
    return clerkResponse;
  }
  
  // Otherwise return Supabase response
  return supabaseResponse;
}

export default middleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}