import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StrayZero - Modern Ballistic Data Interface",
  description: "The modern ballistic data interface. Precision redefined.",
  keywords: "ballistics, shooting, precision, calculator, strelok alternative",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <div className="min-h-screen bg-black flex flex-col">
          {/* Navigation */}
          <nav className="flex items-center justify-between p-6 md:p-8 border-b border-green-900/30">
            <Link href="/" className="text-xl font-bold text-green-300">
              StrayZero
            </Link>
            <div className="flex gap-6 md:gap-10 lg:gap-12">
              <Link href="/app" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                Use StrayZero
              </Link>
              <Link href="/pricing" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                Pricing
              </Link>
              <Link href="/faq" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                FAQ / Contact
              </Link>
            </div>
          </nav>

          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-green-900/30 p-4 md:p-6 text-center text-green-600 text-xs">
            <div className="max-w-4xl mx-auto">© 2025 StrayZero. Precision redefined.</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
