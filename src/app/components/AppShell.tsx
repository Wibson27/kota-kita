"use client";
import { useState, ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Sidebar
        isPremium={false}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(v => !v)}
      />

      {/* Header dengan Profile */}
      <header
        className={`fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-200 ${
          sidebarOpen ? "left-64" : "left-0"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Rani</div>
              <div className="text-xs text-gray-500">rani@example.com</div>
            </div>
            <div className="relative">
              <button className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white font-semibold text-sm hover:ring-2 hover:ring-blue-200 transition-all">
                R
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        {children}
      </main>
    </>
  );
}
