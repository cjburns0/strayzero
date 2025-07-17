"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
export default function HomePage() {

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-300 mb-8">StrayZero</h1>

          {/* Tagline with blinking period */}
          <div className="text-lg md:text-xl lg:text-2xl text-green-400 mb-12">
            The modern ballistic data interface
            <span className="animate-blink-1">.</span>
            <span className="animate-blink-2">.</span>
            <span className="animate-blink-3">.</span>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 space-y-4">
            <Link href="/calculator">
              <Button
                size="lg"
                className="bg-green-900 hover:bg-green-800 text-green-100 border border-green-700 px-8 py-4 text-lg font-mono"
              >
                Launch StrayZero
              </Button>
            </Link>
            
            <div>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gray-900/50 hover:bg-gray-800/50 text-green-400 border border-green-700 px-8 py-4 text-lg font-mono"
                >
                  Join Waitlist
                </Button>
              </SignUpButton>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-gray-500 text-sm md:text-base opacity-60">Loved by former users of Strelok</div>
        </div>
      </main>
    </div>
  )
}