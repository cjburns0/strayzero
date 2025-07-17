import { clerkMiddleware } from '@/utils/clerk/middleware';
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Create a composed middleware that runs both Clerk and Supabase
export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Create Supabase client and get response
  const supabaseResponse = await createClient(request);
  
  // Return the Supabase response which includes cookie handling
  return supabaseResponse;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}