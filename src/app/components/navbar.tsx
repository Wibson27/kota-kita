"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Crown } from "lucide-react"

interface NavbarProps {
  user?: {
    name: string
    email: string
    avatar?: string
    isPremium: boolean
  }
}

export function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-xl text-gray-900">KotaKita</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/compare" className="text-gray-600 hover:text-gray-900 transition-colors">
              Bandingkan Kota
            </Link>
            <Link href="/planning" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tools Perencanaan
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
              Komunitas
            </Link>
          </div>

          {/* User Menu or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {!user.isPremium && (
                  <button
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-4 py-2 rounded text-white font-semibold text-sm flex items-center"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Premium
                  </button>
                )}

                {/* Avatar & Dropdown menu */}
                <div className="relative">
                  <button
                    className="relative h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 focus:outline-none"
                    onClick={() => setIsMenuOpen((v) => !v)}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-700 font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    {user.isPremium && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                        <Crown className="w-3 h-3" />
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
                      <div className="flex items-center gap-2 p-3">
                        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500 truncate w-40">{user.email}</div>
                        </div>
                      </div>
                      <div className="border-t" />
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-50">Dashboard</Link>
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-50">Profil</Link>
                      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-50">Pengaturan</Link>
                      <div className="border-t" />
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">Keluar</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden px-2 py-2 rounded focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                href="/compare"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Bandingkan Kota
              </Link>
              <Link
                href="/planning"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools Perencanaan
              </Link>
              <Link
                href="/community"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Komunitas
              </Link>
              {user && (
                <>
                  <div className="border-t my-2" />
                  <Link href="/dashboard" className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link href="/profile" className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Profil</Link>
                  <Link href="/settings" className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Pengaturan</Link>
                  <button className="px-3 py-2 text-red-600 hover:bg-gray-50 rounded-lg text-left" onClick={() => setIsMenuOpen(false)}>Keluar</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
