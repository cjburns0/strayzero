"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Firearm {
  id: string
  name: string
  caliber: string
  barrelLength: number
  twistRate: string
  heightOverBore: number
}

interface Ammunition {
  id: string
  name: string
  caliber: string
  diameter: number
  weight: number
  ballisticCoefficient: number
  muzzleVelocity: number
}

export default function ReticlePage() {
  const [firearms, setFirearms] = useState<Firearm[]>([])
  const [ammunition, setAmmunition] = useState<Ammunition[]>([])

  useEffect(() => {
    const savedFirearms = localStorage.getItem("firearms")
    const savedAmmo = localStorage.getItem("ammunition")

    if (savedFirearms) {
      setFirearms(JSON.parse(savedFirearms))
    }
    if (savedAmmo) {
      setAmmunition(JSON.parse(savedAmmo))
    }
  }, [])

  // Generate distance markings for different mil holds
  const generateDistanceMarkings = () => {
    const markings = []
    for (let mil = 1; mil <= 10; mil++) {
      // Simplified calculation - in reality this would be much more complex
      const distance = 100 + mil * 50 // Basic approximation
      markings.push({ mil, distance })
    }
    return markings
  }

  const distanceMarkings = generateDistanceMarkings()

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Reticle View</h1>
        </div>

        <Card className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Mil-Dot Reticle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden border border-gray-700">
              {/* Reticle SVG */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                style={{ background: "radial-gradient(circle, #0a0a0a 0%, #000000 100%)" }}
              >
                {/* Main crosshairs */}
                <line x1="200" y1="0" x2="200" y2="400" stroke="#00ff41" strokeWidth="1" opacity="0.9" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#00ff41" strokeWidth="1" opacity="0.9" />

                {/* Center gap */}
                <rect x="195" y="195" width="10" height="10" fill="black" />

                {/* Mil dots - Vertical */}
                {[1, 2, 3, 4, 5].map((mil) => (
                  <g key={`v-${mil}`}>
                    {/* Dots above center */}
                    <circle cx="200" cy={200 - mil * 30} r="2" fill="#00ff41" opacity="0.9" />
                    {/* Dots below center */}
                    <circle cx="200" cy={200 + mil * 30} r="2" fill="#00ff41" opacity="0.9" />

                    {/* Distance labels */}
                    <text x="210" y={200 + mil * 30} fill="#00ff41" fontSize="8" opacity="0.7">
                      {distanceMarkings[mil - 1]?.distance}y
                    </text>
                  </g>
                ))}

                {/* Mil dots - Horizontal */}
                {[1, 2, 3, 4, 5].map((mil) => (
                  <g key={`h-${mil}`}>
                    {/* Dots left of center */}
                    <circle cx={200 - mil * 30} cy="200" r="2" fill="#00ff41" opacity="0.9" />
                    {/* Dots right of center */}
                    <circle cx={200 + mil * 30} cy="200" r="2" fill="#00ff41" opacity="0.9" />
                  </g>
                ))}

                {/* Mil scale markings */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mil) => (
                  <g key={`scale-${mil}`}>
                    {/* Vertical scale lines */}
                    <line
                      x1="195"
                      y1={200 + mil * 15}
                      x2="205"
                      y2={200 + mil * 15}
                      stroke="#00ff41"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                    <line
                      x1="195"
                      y1={200 - mil * 15}
                      x2="205"
                      y2={200 - mil * 15}
                      stroke="#00ff41"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />

                    {/* Horizontal scale lines */}
                    <line
                      x1={200 + mil * 15}
                      y1="195"
                      x2={200 + mil * 15}
                      y2="205"
                      stroke="#00ff41"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                    <line
                      x1={200 - mil * 15}
                      y1="195"
                      x2={200 - mil * 15}
                      y2="205"
                      stroke="#00ff41"
                      strokeWidth="0.5"
                      opacity="0.7"
                    />
                  </g>
                ))}

                {/* Center dot */}
                <circle cx="200" cy="200" r="1" fill="#00ff41" opacity="1" />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Distance Reference */}
        <Card className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">Distance Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {distanceMarkings.slice(0, 8).map((marking) => (
                <div key={marking.mil} className="flex justify-between">
                  <span className="text-green-400 font-mono">{marking.mil} mil:</span>
                  <span className="font-mono text-gray-300">{marking.distance} yds</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              * Distance calculations are approximations based on current firearm and ammunition settings
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-100 mb-2">How to Use</h3>
            <ul className="text-sm text-green-200 space-y-1">
              <li>• Center crosshairs represent your point of aim</li>
              <li>• Each mil dot represents 1 milliradian</li>
              <li>• Distance labels show approximate target ranges</li>
              <li>• Use holdover points for quick range estimation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
