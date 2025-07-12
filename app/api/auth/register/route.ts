import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertUserSchema } from '@shared/schema'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userData = insertUserSchema.parse(body)
    
    const existingUser = await storage.getUserByUsername(userData.username)
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword
    })
    
    return NextResponse.json({ user: { id: user.id, username: user.username } })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}