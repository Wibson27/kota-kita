// src/app/api/auth/signup/route.ts
import { createSupabaseAdminClient } from '@/lib/db/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password } = signupSchema.parse(body)

    const supabase = createSupabaseAdminClient()

    // Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for development
      user_metadata: {
        full_name: fullName,
      },
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 400 }
      )
    }

    // Create user profile in public.users
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        subscription_tier: 'free',
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)

      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)

      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      )
    }

    // Create user preferences
    const { error: preferencesError } = await supabase
      .from('user_preferences')
      .insert({
        user_id: authData.user.id,
        preferred_currency: 'IDR',
        default_lifestyle: 'standard',
      })

    if (preferencesError) {
      console.error('Preferences creation error:', preferencesError)
      // Non-critical error, don't fail the signup
    }

    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: fullName,
        subscription_tier: 'free',
      },
      message: 'Account created successfully',
      redirectUrl: '/dashboard',
    })

  } catch (error) {
    console.error('Signup error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}