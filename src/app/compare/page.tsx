"use client"

import AppShell from "../components/AppShell"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { MapPin, TrendingUp, TrendingDown, Utensils, Home, Car, Zap, ArrowRight, Download } from "lucide-react"

const cities = [
  "Jakarta","Bandung","Surabaya","Medan","Semarang",
  "Makassar","Palembang","Tangerang","Depok","Bekasi",
]

const lifestyles = [
  { value: "student", label: "Student" },
  { value: "standard", label: "Standard" },
  { value: "family", label: "Family" },
  { value: "luxury", label: "Luxury" },
]

const comparisonData = [
  { category: "Makanan",  jakarta: 2_500_000, bandung: 1_800_000 },
  { category: "Hunian",   jakarta: 8_000_000, bandung: 4_500_000 },
  { category: "Transport",jakarta: 1_200_000, bandung:   800_000 },
  { category: "Utilitas", jakarta:   800_000, bandung:   600_000 },
  { category: "Hiburan",  jakarta: 1_500_000, bandung: 1_000_000 },
]

const pieData = [
  { name: "Hunian",   value: 4_500_000, color: "#3B82F6" },
  { name: "Makanan",  value: 1_800_000, color: "#10B981" },
  { name: "Transport",value:   800_000, color: "#F59E0B" },
  { name: "Utilitas", value:   600_000, color: "#EF4444" },
  { name: "Hiburan",  value: 1_000_000, color: "#8B5CF6" },
]

export default function ComparePage() {
  const [originCity, setOriginCity] = useState("")
  const [destinationCity, setDestinationCity] = useState("")
  const [lifestyle, setLifestyle] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompare = () => {
    if (!originCity || !destinationCity || !lifestyle) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 800)
  }

  const totalJakarta = comparisonData.reduce((s, i) => s + i.jakarta, 0)
  const totalBandung = comparisonData.reduce((s, i) => s + i.bandung, 0)
  const savings = totalJakarta - totalBandung
  const savingsPercentage = Math.round((savings / totalJakarta) * 100)

  return (
    <AppShell>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bandingkan Kota</h1>
            <p className="text-gray-600 mt-1">
              Bandingkan biaya hidup antar kota untuk merencanakan relokasi yang lebih baik
            </p>
          </div>

          {/* Form */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Pilih Kota untuk Dibandingkan</CardTitle>
              <CardDescription>Masukkan kota asal, tujuan, dan gaya hidup Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kota Asal</label>
                  <Select value={originCity} onValueChange={setOriginCity}>
                    <SelectTrigger className="h-12 rounded-xl w-full">
                      <SelectValue placeholder="Pilih kota asal" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kota Tujuan</label>
                  <Select value={destinationCity} onValueChange={setDestinationCity}>
                    <SelectTrigger className="h-12 rounded-xl w-full">
                      <SelectValue placeholder="Pilih kota tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Gaya Hidup</label>
                  <Select value={lifestyle} onValueChange={setLifestyle}>
                    <SelectTrigger className="h-12 rounded-xl w-full">
                      <SelectValue placeholder="Pilih gaya hidup" />
                    </SelectTrigger>
                    <SelectContent>
                      {lifestyles.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleCompare}
                disabled={!originCity || !destinationCity || !lifestyle || isLoading}
                className="w-full h-12 text-base rounded-xl"
              >
                {isLoading ? "Memproses..." : "Bandingkan Sekarang"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {showResults && (
            <>
              {/* Summary */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="px-7 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl grid place-items-center">
                        <TrendingDown className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-900">{savingsPercentage}% Lebih Murah</h3>
                        <p className="text-green-700">Hidup di Bandung vs Jakarta</p>
                        <p className="text-sm text-green-600 mt-1">
                          Hemat Rp {savings.toLocaleString("id-ID")} per bulan
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Charts, 2 kolom */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle>Perbandingan per Kategori</CardTitle>
                    <CardDescription>Biaya bulanan dalam Rupiah</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                        <Tooltip formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}`, ""]} />
                        <Bar dataKey="jakarta" fill="#EF4444" name="Jakarta" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="bandung" fill="#10B981" name="Bandung" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle>Distribusi Biaya, Bandung</CardTitle>
                    <CardDescription>Persentase dari total biaya hidup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {pieData.map((e, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                          <span className="text-sm text-gray-600">{e.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detail Perbandingan, FULL WIDTH */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle>Detail Perbandingan</CardTitle>
                  <CardDescription>Analisis mendalam per kategori pengeluaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {comparisonData.map((item, i) => {
                      const diff = item.jakarta - item.bandung
                      const pct = Math.round((diff / item.jakarta) * 100)
                      const good = diff > 0
                      const iconMap = { Makanan: Utensils, Hunian: Home, Transport: Car, Utilitas: Zap, Hiburan: MapPin }
                      const Icon = iconMap[item.category as keyof typeof iconMap] ?? MapPin
                      return (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl grid place-items-center shadow-sm">
                              <Icon className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.category}</h4>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <span>Jakarta, Rp {item.jakarta.toLocaleString("id-ID")}</span>
                                <span>Bandung, Rp {item.bandung.toLocaleString("id-ID")}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center ${good ? "text-green-600" : "text-red-600"}`}>
                              {good ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                              <span className="font-medium">
                                {Math.abs(pct)}% {good ? "lebih murah" : "lebih mahal"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {good ? "Hemat" : "Tambahan"} Rp {Math.abs(diff).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppShell>
  )
}
