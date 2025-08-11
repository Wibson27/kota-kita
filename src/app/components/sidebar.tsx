


"use client"


import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/app/utils";
import { BarChart3, Home, Users, Utensils, Building, Zap, Car, Crown, Lock, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, premium: false },
  { name: "Bandingkan Kota", href: "/compare", icon: BarChart3, premium: false },
  { name: "Komunitas", href: "/community", icon: Users, premium: false },
]

const planningTools = [
  { name: "Perencanaan Makanan", href: "/planning/food", icon: Utensils, premium: true },
  { name: "Perencanaan Hunian", href: "/planning/housing", icon: Building, premium: true },
  { name: "Perencanaan Utilitas", href: "/planning/utilities", icon: Zap, premium: true },
  { name: "Perencanaan Transport", href: "/planning/transport", icon: Car, premium: true },
]

interface SidebarProps {
  isPremium: boolean
  open: boolean
  onToggle: () => void
}

export function Sidebar({ isPremium, open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 w-64 transition-all duration-300 flex flex-col",
        open ? "translate-x-0" : "-translate-x-64"
      )}
    >
      {/* Tombol close di mobile/desktop */}
      <button
        className="absolute top-4 right-4 md:hidden p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        onClick={onToggle}
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="ml-2 font-bold text-xl text-gray-900">KotaKita</span>
        </div>

        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-2xl transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500",
                  )}
                />
                {item.name}
              </Link>
            )
          })}

          <div className="pt-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools Perencanaan</h3>
              {isPremium && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                  <Crown className="w-3 h-3 mr-1 inline" />
                  Premium
                </span>
              )}
            </div>

            {planningTools.map((item) => {
              const isActive = pathname === item.href
              const isLocked = item.premium && !isPremium

              return (
                <Link
                  key={item.name}
                  href={isLocked ? "#" : item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-2xl transition-colors relative",
                    isLocked
                      ? "text-gray-400 cursor-not-allowed"
                      : isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                  onClick={isLocked ? (e) => e.preventDefault() : undefined}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isLocked
                        ? "text-gray-300"
                        : isActive
                          ? "text-blue-500"
                          : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />
                  {item.name}
                  {isLocked && <Lock className="ml-auto h-4 w-4 text-gray-300" />}
                </Link>
              )
            })}
          </div>
        </nav>

        {!isPremium && (
          <div className="flex-shrink-0 p-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center">
                <Crown className="h-8 w-8 text-amber-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-800">Upgrade ke Premium</p>
                  <p className="text-xs text-amber-600">Akses semua tools perencanaan</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg px-4 py-2 text-sm transition">
                Upgrade Sekarang
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button - Paling Bawah */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}
