# Clerk Authentication Setup

This document outlines how Clerk authentication was integrated into the StrayZero application.

## Overview

StrayZero uses [Clerk](https://clerk.com/) for user authentication and management. Clerk provides a complete user management solution with built-in UI components, user profiles, and secure authentication.

## Installation Steps

### 1. Package Installation

```bash
npm install @clerk/nextjs@latest --legacy-peer-deps
```

We used `--legacy-peer-deps` due to peer dependency conflicts with other packages in the project.

### 2. Environment Variables

Created `.env.local` file with Clerk API keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dmVyaWZpZWQta2F0eWRpZC0xLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_mCOoIe9rWdyTAl71UtjOy2CoqhgeBFUa4mvLY9EsMi
```

### 3. Middleware Configuration

Created `middleware.ts` at the root of the project:

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

### 4. ClerkProvider Integration

Updated `app/layout.tsx` to wrap the application with ClerkProvider:

```typescript
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Application content */}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### 5. Authentication UI Components

Added authentication components to the navigation bar in `app/layout.tsx`:

- **Sign In/Sign Up buttons**: Displayed when user is signed out
- **User Profile button**: Displayed when user is signed in
- Styled to match the StrayZero green theme
- Uses modal dialogs for sign in/sign up flow

## Current Authentication State

### Public Routes (No Authentication Required)

Currently, **all routes are publicly accessible**:

- `/` - Landing page
- `/calculator` - Ballistic calculator
- `/settings` - Firearm and ammunition profiles
- `/reticle` - Reticle view
- `/pricing` - Pricing page
- `/faq` - FAQ/Contact page

### Protected Routes

**None** - The application currently has no protected routes. All functionality is available to both authenticated and unauthenticated users.

## Next Steps for Authentication

To protect routes and features, you can:

1. **Protect entire routes** using Clerk's middleware:
   ```typescript
   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
   
   const isProtectedRoute = createRouteMatcher(['/calculator(.*)'])
   
   export default clerkMiddleware(async (auth, req) => {
     if (isProtectedRoute(req)) await auth.protect()
   })
   ```

2. **Protect specific features** within pages:
   ```typescript
   import { auth } from '@clerk/nextjs/server'
   
   export default async function Page() {
     const { userId } = await auth()
     
     if (!userId) {
       return <div>Please sign in to access this feature</div>
     }
     
     // Protected content
   }
   ```

3. **Use conditional rendering** with Clerk components:
   ```typescript
   <SignedIn>
     {/* Content only visible to signed-in users */}
   </SignedIn>
   
   <SignedOut>
     {/* Content only visible to signed-out users */}
   </SignedOut>
   ```

## Benefits of Current Setup

1. **User accounts**: Users can create accounts and manage their profiles
2. **Session management**: Clerk handles secure session management
3. **Social logins**: Easy to add Google, GitHub, etc. (configure in Clerk Dashboard)
4. **User metadata**: Can store user preferences and settings
5. **Ready for protection**: Easy to add route protection when needed

## Clerk Dashboard

Access the Clerk Dashboard at [dashboard.clerk.com](https://dashboard.clerk.com) to:

- View user accounts
- Configure authentication methods
- Customize the sign-in/sign-up UI
- Set up webhooks
- Manage API keys