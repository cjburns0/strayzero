"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"

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

export default function SettingsPage() {
  const [firearms, setFirearms] = useState<Firearm[]>([])
  const [ammunition, setAmmunition] = useState<Ammunition[]>([])
  const [isFirearmDialogOpen, setIsFirearmDialogOpen] = useState(false)
  const [isAmmoDialogOpen, setIsAmmoDialogOpen] = useState(false)
  const [editingFirearm, setEditingFirearm] = useState<Firearm | null>(null)
  const [editingAmmo, setEditingAmmo] = useState<Ammunition | null>(null)

  // Form states
  const [firearmForm, setFirearmForm] = useState({
    name: "",
    caliber: "",
    barrelLength: 20,
    twistRate: "1:10",
    heightOverBore: 1.5,
  })

  const [ammoForm, setAmmoForm] = useState({
    name: "",
    caliber: "",
    diameter: 0.308,
    weight: 168,
    ballisticCoefficient: 0.5,
    muzzleVelocity: 2600,
  })

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

  const saveFirearms = (newFirearms: Firearm[]) => {
    setFirearms(newFirearms)
    localStorage.setItem("firearms", JSON.stringify(newFirearms))
  }

  const saveAmmunition = (newAmmo: Ammunition[]) => {
    setAmmunition(newAmmo)
    localStorage.setItem("ammunition", JSON.stringify(newAmmo))
  }

  const handleSaveFirearm = () => {
    const newFirearm: Firearm = {
      id: editingFirearm?.id || Date.now().toString(),
      ...firearmForm,
    }

    if (editingFirearm) {
      saveFirearms(firearms.map((f) => (f.id === editingFirearm.id ? newFirearm : f)))
    } else {
      saveFirearms([...firearms, newFirearm])
    }

    setFirearmForm({
      name: "",
      caliber: "",
      barrelLength: 20,
      twistRate: "1:10",
      heightOverBore: 1.5,
    })
    setEditingFirearm(null)
    setIsFirearmDialogOpen(false)
  }

  const handleSaveAmmo = () => {
    const newAmmo: Ammunition = {
      id: editingAmmo?.id || Date.now().toString(),
      ...ammoForm,
    }

    if (editingAmmo) {
      saveAmmunition(ammunition.map((a) => (a.id === editingAmmo.id ? newAmmo : a)))
    } else {
      saveAmmunition([...ammunition, newAmmo])
    }

    setAmmoForm({
      name: "",
      caliber: "",
      diameter: 0.308,
      weight: 168,
      ballisticCoefficient: 0.5,
      muzzleVelocity: 2600,
    })
    setEditingAmmo(null)
    setIsAmmoDialogOpen(false)
  }

  const handleEditFirearm = (firearm: Firearm) => {
    setFirearmForm(firearm)
    setEditingFirearm(firearm)
    setIsFirearmDialogOpen(true)
  }

  const handleEditAmmo = (ammo: Ammunition) => {
    setAmmoForm(ammo)
    setEditingAmmo(ammo)
    setIsAmmoDialogOpen(true)
  }

  const handleDeleteFirearm = (id: string) => {
    saveFirearms(firearms.filter((f) => f.id !== id))
  }

  const handleDeleteAmmo = (id: string) => {
    saveAmmunition(ammunition.filter((a) => a.id !== id))
  }

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
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        <Tabs defaultValue="firearms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="firearms"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300"
            >
              Firearms
            </TabsTrigger>
            <TabsTrigger
              value="ammunition"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300"
            >
              Ammunition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="firearms" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Firearm Profiles</h2>
              <Dialog open={isFirearmDialogOpen} onOpenChange={setIsFirearmDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Firearm
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingFirearm ? "Edit Firearm" : "Add New Firearm"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="firearm-name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="firearm-name"
                        value={firearmForm.name}
                        onChange={(e) => setFirearmForm({ ...firearmForm, name: e.target.value })}
                        placeholder="e.g., Remington 700"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="caliber" className="text-gray-300">
                        Caliber
                      </Label>
                      <Input
                        id="caliber"
                        value={firearmForm.caliber}
                        onChange={(e) => setFirearmForm({ ...firearmForm, caliber: e.target.value })}
                        placeholder="e.g., .308 Win"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="barrel-length" className="text-gray-300">
                        Barrel Length (inches)
                      </Label>
                      <Input
                        id="barrel-length"
                        type="number"
                        value={firearmForm.barrelLength}
                        onChange={(e) => setFirearmForm({ ...firearmForm, barrelLength: Number(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twist-rate" className="text-gray-300">
                        Twist Rate
                      </Label>
                      <Input
                        id="twist-rate"
                        value={firearmForm.twistRate}
                        onChange={(e) => setFirearmForm({ ...firearmForm, twistRate: e.target.value })}
                        placeholder="e.g., 1:10"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height-over-bore" className="text-gray-300">
                        Height Over Bore (inches)
                      </Label>
                      <Input
                        id="height-over-bore"
                        type="number"
                        step="0.1"
                        value={firearmForm.heightOverBore}
                        onChange={(e) => setFirearmForm({ ...firearmForm, heightOverBore: Number(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button onClick={handleSaveFirearm} className="w-full bg-green-600 hover:bg-green-700">
                      {editingFirearm ? "Update" : "Save"} Firearm
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {firearms.map((firearm) => (
                <Card key={firearm.id} className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{firearm.name}</h3>
                        <p className="text-sm text-gray-300">{firearm.caliber}</p>
                        <p className="text-xs text-gray-400">
                          {firearm.barrelLength}" barrel, {firearm.twistRate} twist
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditFirearm(firearm)}
                          className="border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteFirearm(firearm.id)}
                          className="border-red-600 bg-red-900/50 hover:bg-red-800 text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ammunition" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Ammunition Profiles</h2>
              <Dialog open={isAmmoDialogOpen} onOpenChange={setIsAmmoDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ammo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingAmmo ? "Edit Ammunition" : "Add New Ammunition"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ammo-name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="ammo-name"
                        value={ammoForm.name}
                        onChange={(e) => setAmmoForm({ ...ammoForm, name: e.target.value })}
                        placeholder="e.g., Federal Gold Medal Match"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ammo-caliber" className="text-gray-300">
                        Caliber
                      </Label>
                      <Input
                        id="ammo-caliber"
                        value={ammoForm.caliber}
                        onChange={(e) => setAmmoForm({ ...ammoForm, caliber: e.target.value })}
                        placeholder="e.g., .308 Win"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="diameter" className="text-gray-300">
                        Diameter (inches)
                      </Label>
                      <Input
                        id="diameter"
                        type="number"
                        step="0.001"
                        value={ammoForm.diameter}
                        onChange={(e) => setAmmoForm({ ...ammoForm, diameter: Number(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-gray-300">
                        Weight (grains): {ammoForm.weight}
                      </Label>
                      <Slider
                        value={[ammoForm.weight]}
                        onValueChange={(value) => setAmmoForm({ ...ammoForm, weight: value[0] })}
                        max={300}
                        min={50}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bc" className="text-gray-300">
                        Ballistic Coefficient
                      </Label>
                      <Input
                        id="bc"
                        type="number"
                        step="0.001"
                        value={ammoForm.ballisticCoefficient}
                        onChange={(e) => setAmmoForm({ ...ammoForm, ballisticCoefficient: Number(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mv" className="text-gray-300">
                        Muzzle Velocity (fps)
                      </Label>
                      <Input
                        id="mv"
                        type="number"
                        value={ammoForm.muzzleVelocity}
                        onChange={(e) => setAmmoForm({ ...ammoForm, muzzleVelocity: Number(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button onClick={handleSaveAmmo} className="w-full bg-green-600 hover:bg-green-700">
                      {editingAmmo ? "Update" : "Save"} Ammunition
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {ammunition.map((ammo) => (
                <Card key={ammo.id} className="bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{ammo.name}</h3>
                        <p className="text-sm text-gray-300">
                          {ammo.caliber} - {ammo.weight}gr
                        </p>
                        <p className="text-xs text-gray-400">
                          BC: {ammo.ballisticCoefficient} | MV: {ammo.muzzleVelocity} fps
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditAmmo(ammo)}
                          className="border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteAmmo(ammo.id)}
                          className="border-red-600 bg-red-900/50 hover:bg-red-800 text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
