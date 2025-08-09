// src/lib/auth/config.ts
import { createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export const createAuthClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
}

export const getUser = async () => {
  const supabase = createAuthClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get user profile data
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      ...user,
      profile
    }
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export const getSession = async () => {
  const supabase = createAuthClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error)
      return null
    }

    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

// Check if user has premium subscription
export const isPremiumUser = async (userId: string): Promise<boolean> => {
  const supabase = createAuthClient()

  try {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_tier, subscription_end_date')
      .eq('id', userId)
      .single()

    if (!user) return false

    if (user.subscription_tier === 'free') return false

    // Check if subscription is still active
    if (user.subscription_end_date) {
      const endDate = new Date(user.subscription_end_date)
      const now = new Date()
      return endDate > now
    }

    return user.subscription_tier === 'premium' || user.subscription_tier === 'corporate'
  } catch (error) {
    console.error('Error checking premium status:', error)
    return false
  }
}

// Rate limiting check based on subscription tier
export const checkRateLimit = async (userId: string, action: string) => {
  const supabase = createAuthClient()

  try {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_tier, reports_created')
      .eq('id', userId)
      .single()

    if (!user) {
      throw new Error('User not found')
    }

    // Define rate limits based on documentation
    const rateLimits = {
      free: {
        comparison_reports: 1, // 1 free report per day
        api_calls: 100, // 100 API calls per hour
      },
      premium: {
        comparison_reports: 50, // 50 reports per day
        api_calls: 1000, // 1000 API calls per hour
      },
      corporate: {
        comparison_reports: -1, // unlimited
        api_calls: -1, // unlimited
      }
    }

    const userTier = user.subscription_tier
    const limit = rateLimits[userTier]?.[action as keyof typeof rateLimits.free]

    if (limit === -1) {
      return { allowed: true, remaining: -1 }
    }

    if (action === 'comparison_reports') {
      const allowed = user.reports_created < limit
      return {
        allowed,
        remaining: Math.max(0, limit - user.reports_created),
        resetTime: 'daily'
      }
    }

    return { allowed: true, remaining: limit }
  } catch (error) {
    console.error('Error checking rate limit:', error)
    return { allowed: false, remaining: 0 }
  }
}