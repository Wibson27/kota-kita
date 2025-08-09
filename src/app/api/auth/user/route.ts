// src/app/api/auth/user/route.ts
import { getUser, isPremiumUser } from '@/lib/auth/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check premium status
    const isPremium = await isPremiumUser(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        ...user.profile,
        isPremium,
      },
    })

  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}