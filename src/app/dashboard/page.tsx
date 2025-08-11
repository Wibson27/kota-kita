
import AppShell from "../components/AppShell";
import { useMemo } from "react";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Crown, ArrowRight, TrendingUp, TrendingDown, Clock, Bookmark, Zap, BarChart3, Utensils, Building, Car } from "lucide-react";
import Link from "next/link";

// ... existing code ...
const mockUser = {
  name: "Rani",
  email: "rani@example.com",
  avatar: "",
  isPremium: false,
  maxQuota: 3,
  favoriteCity: "Bandung",
};
// ... existing code ...


export default function DashboardPage() {
  return (
    <AppShell >
    <div className="flex flex-col gap-6 p-8 bg-[#FAFAFB] min-h-screen">
      {/* Greeting & status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold mb-1 flex items-center gap-2 text-black">
            Selamat datang kembali, {mockUser.name}! <span className="text-3xl">👋</span>
          </h1>
          <div className="text-gray-500 text-lg">Lihat ringkasan aktivitas dan lanjutkan perencanaan relokasi Anda</div>
        </div>
        <div>
          <Badge className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            Akun Gratis
          </Badge>
        </div>
      </div>

        {/* Quick Stats from Database */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Saved Comparisons */}
          <div className="bg-white rounded-2xl shadow border p-5 relative">
            {/* Icon di kanan atas */}
            <svg
              className="h-5 w-5 text-blue-500 absolute top-5 right-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5v14l7-7 7 7V5H5z"
              />
            </svg>
            <p className="text-sm font-bold text-gray-500 mb-2">Saved Comparisons</p>
            <div className="text-3xl font-bold text-gray-900 mt-3">3</div>
            <p className="text-xs text-gray-500 mt-2">
              {mockUser.isPremium ? "Tidak ada batas" : ` Perbandingan disimpan`}
            </p>
          </div>

          {/* Favorite City */}
          <div className="bg-white rounded-2xl shadow border p-5 relative">
            <svg
              className="h-5 w-5 text-green-500 absolute top-5 right-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.134 2 5 5.134 5 9c0 7 7 13 7 13s7-6 7-13c0-3.866-3.134-7-7-7z"
              />
            </svg>
            <p className="text-sm font-bold text-gray-500 mb-2">Favorite City</p>
            <div className="text-3xl font-bold text-gray-900 mt-3">{mockUser.favoriteCity}</div>
            <p className="text-xs text-gray-500 mt-2">Paling sering dibandingkan</p>
          </div>

          {/* Premium Upgrade Card */}
          {!mockUser.isPremium && (
            <div className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden relative p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-300/30 rounded-full"></div>
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"
                    />
                  </svg>
                  <h3 className="ml-2 text-base font-semibold text-white">Upgrade ke Premium</h3>
                </div>

                <p className="text-blue-100 text-xs mb-3 leading-snug">
                  Akses semua tools perencanaan dan fitur premium lainnya
                </p>

                <a
                  href="/upgrade"
                  className="w-full block text-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg border-0 shadow px-3 py-1.5 text-sm"
                >
                  Upgrade Sekarang
                </a>
              </div>
            </div>
          )}
        </div>



      {/* Main Cards: Perbandingan Tersimpan & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Saved Comparisons */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Perbandingan Tersimpan
            </CardTitle>
            <CardDescription>Akses cepat ke perbandingan yang sudah Anda buat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors">
              <div>
                <h4 className="font-medium">Jakarta → Bandung</h4>
                <p className="text-sm text-gray-600">Standard lifestyle</p>
                <p className="text-xs text-gray-500">Dibuat: 2 hari lalu</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span className="font-medium">32% hemat</span>
                </div>
                <p className="text-xs text-gray-500">Rp 3.2M/bulan</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors">
              <div>
                <h4 className="font-medium">Jakarta → Surabaya</h4>
                <p className="text-sm text-gray-600">Family lifestyle</p>
                <p className="text-xs text-gray-500">Dibuat: 1 minggu lalu</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span className="font-medium">25% hemat</span>
                </div>
                <p className="text-xs text-gray-500">Rp 2.8M/bulan</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors">
              <div>
                <h4 className="font-medium">Bandung → Yogyakarta</h4>
                <p className="text-sm text-gray-600">Student lifestyle</p>
                <p className="text-xs text-gray-500">Dibuat: 2 minggu lalu</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-red-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-medium">15% mahal</span>
                </div>
                <p className="text-xs text-gray-500">Rp 800K/bulan</p>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/comparisons">
                Lihat Semua Perbandingan (7)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription>Akses cepat ke fitur-fitur utama KotaKita</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link
            href="/compare"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5" /> 
              <span className="font-medium">Bandingkan Kota Baru</span>
            </div>
          </Link>

          <Link
            href="/planning/food"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Utensils className="w-5 h-5" /> 
              <span className="font-medium">Perencanaan Makanan</span>
            </div>
            {!mockUser.isPremium && (
              <span className="inline-flex items-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded font-bold">
                Premium
              </span>
            )}
          </Link>

          <Link
            href="/planning/housing"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5" /> 
              <span className="font-medium">Perencanaan Hunian</span>
            </div>
            {!mockUser.isPremium && (
              <span className="inline-flex items-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded font-bold">
                Premium
              </span>
            )}
          </Link>

          <Link
            href="/planning/utilities"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5" /> 
              <span className="font-medium">Perencanaan Utilitas</span>
            </div>
            {!mockUser.isPremium && (
              <span className="inline-flex items-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded font-bold">
                Premium
              </span>
            )}
          </Link>

          <Link
            href="/planning/transport"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5" /> 
              <span className="font-medium">Perencanaan Transport</span>
            </div>
            {!mockUser.isPremium && (
              <span className="inline-flex items-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded font-bold">
                Premium
              </span>
            )}
          </Link>
        </CardContent>
      </Card>
      </div>
    </div>
    </AppShell>

  )
}
