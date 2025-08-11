"use client"

import AppShell from "../../components/AppShell"

import { useState } from "react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  Eye,
  Download,
  Trash2,
  ArrowRight,
} from "lucide-react"

// data dummy
const savedComparisons = [
  { id: 1, fromCity: "Jakarta", toCity: "Bandung", lifestyle: "Standard", savings: 32, savingsAmount: 3200000, totalCostFrom: 10000000, totalCostTo: 6800000, createdAt: "2024-01-15", lastViewed: "2024-01-17" },
  { id: 2, fromCity: "Jakarta", toCity: "Surabaya", lifestyle: "Family", savings: 25, savingsAmount: 2800000, totalCostFrom: 11200000, totalCostTo: 8400000, createdAt: "2024-01-08", lastViewed: "2024-01-10" },
  { id: 3, fromCity: "Bandung", toCity: "Yogyakarta", lifestyle: "Student", savings: -15, savingsAmount: -800000, totalCostFrom: 5200000, totalCostTo: 6000000, createdAt: "2024-01-01", lastViewed: "2024-01-03" },
  { id: 4, fromCity: "Jakarta", toCity: "Medan", lifestyle: "Standard", savings: 28, savingsAmount: 2600000, totalCostFrom: 9300000, totalCostTo: 6700000, createdAt: "2023-12-20", lastViewed: "2023-12-22" },
  { id: 5, fromCity: "Surabaya", toCity: "Malang", lifestyle: "Standard", savings: 35, savingsAmount: 2100000, totalCostFrom: 6000000, totalCostTo: 3900000, createdAt: "2023-12-15", lastViewed: "2023-12-18" },
  { id: 6, fromCity: "Jakarta", toCity: "Semarang", lifestyle: "Standard", savings: 30, savingsAmount: 2700000, totalCostFrom: 9000000, totalCostTo: 6300000, createdAt: "2023-12-10", lastViewed: "2023-12-12" },
  { id: 7, fromCity: "Bandung", toCity: "Jakarta", lifestyle: "Luxury", savings: -45, savingsAmount: -4500000, totalCostFrom: 10000000, totalCostTo: 14500000, createdAt: "2023-12-05", lastViewed: "2023-12-07" },
]

export default function ComparisonsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const filteredComparisons = savedComparisons
    .filter((c) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        c.fromCity.toLowerCase().includes(q) || c.toCity.toLowerCase().includes(q)
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "profitable" && c.savings > 0) ||
        (filterBy === "expensive" && c.savings < 0)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "savings-high":
          return b.savings - a.savings
        case "savings-low":
          return a.savings - b.savings
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    return (
      <AppShell>
        <div className="mx-auto max-w-7xl p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Riwayat Perbandingan</h1>
              <p className="text-gray-600 mt-1">
                Kelola dan akses kembali semua perbandingan kota yang pernah Anda buat
              </p>
            </div>
            <Button asChild>
              <Link href="/compare">
                Buat Perbandingan Baru
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
  
          {/* Search + Filters - 3 kolom berimbang */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <Input
                    placeholder="Cari berdasarkan nama kota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 rounded-xl w-full border border-input bg-background"
                  />
                </div>
  
                {/* Filter */}
                <div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="h-12 rounded-xl w-full">
                    <Filter className="w-4 h-4 mr-2 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <SelectValue placeholder="Semua Perbandingan" />
                    </div>
                  </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Perbandingan</SelectItem>
                      <SelectItem value="profitable">Menguntungkan</SelectItem>
                      <SelectItem value="expensive">Lebih Mahal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                {/* Sort */}
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 rounded-xl w-full">
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="oldest">Terlama</SelectItem>
                      <SelectItem value="savings-high">Penghematan Tertinggi</SelectItem>
                      <SelectItem value="savings-low">Penghematan Terendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Menampilkan {filteredComparisons.length} dari {savedComparisons.length} perbandingan
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredComparisons.map((c) => {
            const positive = c.savings > 0
            return (
              <Card key={c.id} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {c.fromCity} → {c.toCity}
                        </h3>
                        <Badge variant="secondary">{c.lifestyle}</Badge>
                        <div className={`flex items-center ${positive ? "text-green-600" : "text-red-600"}`}>
                          {positive ? (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {Math.abs(c.savings)}% {positive ? "lebih murah" : "lebih mahal"}
                          </span>
                        </div>
                      </div>

                      {/* rata kiri: hapus text-center di semua kotak */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">Biaya di {c.fromCity}</p>
                          <p className="font-semibold text-gray-900">
                            Rp {c.totalCostFrom.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">Biaya di {c.toCity}</p>
                          <p className="font-semibold text-gray-900">
                            Rp {c.totalCostTo.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className={`p-3 rounded-xl ${positive ? "bg-green-50" : "bg-red-50"}`}>
                          <p className="text-sm text-gray-600">
                            {positive ? "Penghematan" : "Tambahan Biaya"}
                          </p>
                          <p className={`font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>
                            Rp {Math.abs(c.savingsAmount).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">Per Tahun</p>
                          <p className={`font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>
                            Rp {(Math.abs(c.savingsAmount) * 12).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Dibuat, {formatDate(c.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Terakhir dilihat, {formatDate(c.lastViewed)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl bg-transparent text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}