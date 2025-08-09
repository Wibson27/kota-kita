// src/lib/db/client.ts
import { createClientComponentClient, createServerComponentClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

// Environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (for browser)
export const createSupabaseClient = () => {
  return createClientComponentClient<Database>()
}

// Server-side Supabase client (for SSR/API routes)
export const createSupabaseServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
}

// Admin Supabase client (for server-side operations with elevated privileges)
export const createSupabaseAdminClient = () => {
  if (!supabaseServiceKey) {
    throw new Error('Missing Supabase service role key')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Utility function to get the appropriate client based on context
export const getSupabaseClient = (context: 'client' | 'server' | 'admin' = 'client') => {
  switch (context) {
    case 'client':
      return createSupabaseClient()
    case 'server':
      return createSupabaseServerClient()
    case 'admin':
      return createSupabaseAdminClient()
    default:
      return createSupabaseClient()
  }
}