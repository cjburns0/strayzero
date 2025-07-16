"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Target, Wind } from "lucide-react"
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

export default function HomePage() {
  const [firearms, setFirearms] = useState<Firearm[]>([])
  const [ammunition, setAmmunition] = useState<Ammunition[]>([])
  const [selectedFirearm, setSelectedFirearm] = useState<string>("")
  const [selectedAmmo, setSelectedAmmo] = useState<string>("")
  const [distance, setDistance] = useState<number>(100)
  const [windSpeed, setWindSpeed] = useState<number>(0)
  const [windDirection, setWindDirection] = useState<number>(90)
  const [elevation, setElevation] = useState<number>(0)
  const [windage, setWindage] = useState<number>(0)

  // Load saved data on component mount
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

  // Basic ballistic calculation (simplified)
  const calculateAdjustments = () => {
    const firearm = firearms.find((f) => f.id === selectedFirearm)
    const ammo = ammunition.find((a) => a.id === selectedAmmo)

    if (!firearm || !ammo) return

    // Simplified ballistic calculations
    const gravity = 32.174 // ft/s²
    const timeOfFlight = distance / (ammo.muzzleVelocity * Math.cos(0)) // simplified
    const drop = 0.5 * gravity * Math.pow(timeOfFlight, 2) // feet

    // Convert to mils (1 mil = 3.6 inches at 100 yards)
    const dropInches = drop * 12
    const dropMils = (dropInches / distance) * 27.78 // approximate conversion

    // Wind drift calculation (simplified)
    const windDrift = (windSpeed * timeOfFlight * Math.sin((windDirection * Math.PI) / 180)) / 12
    const windageMils = (windDrift / distance) * 27.78

    setElevation(Math.round(dropMils * 10) / 10)
    setWindage(Math.round(windageMils * 10) / 10)
  }

  useEffect(() => {
    calculateAdjustments()
  }, [selectedFirearm, selectedAmmo, distance, windSpeed, windDirection])

  const currentFirearm = firearms.find((f) => f.id === selectedFirearm)
  const currentAmmo = ammunition.find((a) => a.id === selectedAmmo)

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Ballistic Calculator</h1>
          <div className="flex gap-2">
            <Link href="/reticle">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
              >
                <Target className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Adjustments Display */}
        <Card className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 border-blue-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-blue-100">Adjustments (mils)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-sm text-blue-200 mb-1">ELEVATION</div>
                <div className="text-3xl font-bold text-white font-mono drop-shadow-lg">
                  {elevation > 0 ? "+" : ""}
                  {elevation}
                </div>
                <div className="text-xs text-blue-300">{elevation > 0 ? "UP" : elevation < 0 ? "DOWN" : "ZERO"}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-200 mb-1">WINDAGE</div>
                <div className="text-3xl font-bold text-white font-mono drop-shadow-lg">
                  {windage > 0 ? "+" : ""}
                  {windage}
                </div>
                <div className="text-xs text-blue-300">{windage > 0 ? "RIGHT" : windage < 0 ? "LEFT" : "ZERO"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Conditions */}
        <Card className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Wind className="h-5 w-5 text-green-400" />
              Shooting Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="distance" className="text-gray-300">
                Distance (yards)
              </Label>
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="text-lg font-mono bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="windSpeed" className="text-gray-300">
                  Wind Speed (mph)
                </Label>
                <Input
                  id="windSpeed"
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="font-mono bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
              <div>
                <Label htmlFor="windDirection" className="text-gray-300">
                  Wind Direction (°)
                </Label>
                <Input
                  id="windDirection"
                  type="number"
                  value={windDirection}
                  onChange={(e) => setWindDirection(Number(e.target.value))}
                  className="font-mono bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Selection */}
        <Card className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">Current Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firearm" className="text-gray-300">
                Firearm
              </Label>
              <Select value={selectedFirearm} onValueChange={setSelectedFirearm}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select firearm" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {firearms.map((firearm) => (
                    <SelectItem key={firearm.id} value={firearm.id} className="text-white hover:bg-gray-700">
                      {firearm.name} ({firearm.caliber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ammunition" className="text-gray-300">
                Ammunition
              </Label>
              <Select value={selectedAmmo} onValueChange={setSelectedAmmo}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select ammunition" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {ammunition.map((ammo) => (
                    <SelectItem key={ammo.id} value={ammo.id} className="text-white hover:bg-gray-700">
                      {ammo.name} ({ammo.weight}gr)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentFirearm && currentAmmo && (
              <div className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-lg border border-gray-600/50">
                <div>
                  Barrel: {currentFirearm.barrelLength}" | Twist: {currentFirearm.twistRate}
                </div>
                <div>
                  BC: {currentAmmo.ballisticCoefficient} | MV: {currentAmmo.muzzleVelocity} fps
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/reticle">
            <Button
              className="w-full bg-gray-800/90 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 font-medium border-2 border-emerald-500"
              variant="outline"
            >
              <Target className="h-4 w-4 mr-2" />
              View Reticle
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              className="w-full bg-gray-800/90 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 border-lime-600 border-2"
              variant="outline"
            >
              <Settings className="h-4 w-4 mr-2" />
              Firearms / Ammo Profiles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
