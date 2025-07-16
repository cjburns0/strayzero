import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-green-300 mb-4">Pricing</h1>
            <div className="text-green-600 text-lg mb-4 opacity-80">To come down the road...</div>
            <p className="text-green-500">Free to all early users. Feedback welcome</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="bg-green-950/5 border-green-900/20 text-green-600 opacity-50">
              <CardHeader>
                <CardTitle className="text-green-500">Basic</CardTitle>
                <CardDescription className="text-green-600">Essential ballistic calculations</CardDescription>
                <div className="text-2xl font-bold text-green-500">
                  TBD<span className="text-sm font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Basic trajectory calculations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Wind compensation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">5 rifle profiles</span>
                  </li>
                </ul>
                <Button
                  disabled
                  className="w-full bg-green-900/50 text-green-600 border border-green-900/30 cursor-not-allowed"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-green-950/5 border-green-900/20 text-green-600 opacity-50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-700 text-green-100 px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
              </div>
              <CardHeader>
                <CardTitle className="text-green-500">Pro</CardTitle>
                <CardDescription className="text-green-600">Advanced ballistic modeling</CardDescription>
                <div className="text-2xl font-bold text-green-500">
                  TBD<span className="text-sm font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Advanced atmospheric modeling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Unlimited rifle profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Export data capabilities</span>
                  </li>
                </ul>
                <Button
                  disabled
                  className="w-full bg-green-900/50 text-green-600 border border-green-900/30 cursor-not-allowed"
                >
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>

            {/* Elite Plan */}
            <Card className="bg-green-950/5 border-green-900/20 text-green-600 opacity-50">
              <CardHeader>
                <CardTitle className="text-green-500">Elite</CardTitle>
                <CardDescription className="text-green-600">Professional-grade precision</CardDescription>
                <div className="text-2xl font-bold text-green-500">
                  TBD<span className="text-sm font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Real-time weather integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom bullet library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button
                  disabled
                  className="w-full bg-green-900/50 text-green-600 border border-green-900/30 cursor-not-allowed"
                >
                  Go Elite
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
