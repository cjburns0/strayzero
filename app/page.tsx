"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Clerk or backend to save email
    console.log("Waitlist email:", email)
    setSubmitted(true)
    setTimeout(() => {
      setShowWaitlist(false)
      setSubmitted(false)
      setEmail("")
    }, 2000)
  }

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
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowWaitlist(true)}
                className="bg-gray-900/50 hover:bg-gray-800/50 text-green-400 border border-green-700 px-8 py-4 text-lg font-mono"
              >
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-gray-500 text-sm md:text-base opacity-60">Loved by former users of Strelok</div>
        </div>
      </main>

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlist} onOpenChange={setShowWaitlist}>
        <DialogContent className="bg-gray-900 border-green-700 text-green-400">
          <DialogHeader>
            <DialogTitle className="text-green-300 text-xl">Join the StrayZero Waitlist</DialogTitle>
            <DialogDescription className="text-green-600">
              Be the first to know when new features are released.
            </DialogDescription>
          </DialogHeader>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email" className="text-green-400">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-black border-green-900/30 text-green-300 placeholder-green-700 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-green-900 hover:bg-green-800 text-green-100 border border-green-700"
              >
                Join Waitlist
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-green-400 text-lg">Thank you for joining!</p>
              <p className="text-green-600 text-sm mt-2">We'll be in touch soon.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}