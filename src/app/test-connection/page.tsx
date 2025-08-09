// src/app/test-connection/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/db/client'
import type { City } from '@/types/database'

export default function TestConnection() {
  const [status, setStatus] = useState('Testing connection...')
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createSupabaseClient()

        // Test basic connection
        const { data, error } = await supabase
          .from('cities')
          .select('*')
          .limit(5)

        if (error) {
          setStatus(`Error: ${error.message}`)
        } else {
          setStatus('✅ Connection successful!')
          setCities(data || [])
        }
      } catch (error) {
        setStatus(`❌ Connection failed: ${error}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">KotaKita Database Test</h1>
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
      {cities.length > 0 && (
        <div>
          <strong>Sample Cities:</strong>
          <ul className="list-disc ml-6">
            {cities.map((city) => (
              <li key={city.id}>{city.name}, {city.province}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}