'use server'

import { storage } from '@/lib/storage'
import { insertUserSchema } from '@/shared/schema'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  
  if (!username || !password) {
    return { success: false, message: 'Username and password required' }
  }
  
  try {
    const user = await storage.getUserByUsername(username)
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return { success: false, message: 'Invalid credentials' }
    }
    
    return { success: true, user: { id: user.id, username: user.username } }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Login failed' }
  }
}

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  
  try {
    const userData = insertUserSchema.parse({ username, password })
    
    const existingUser = await storage.getUserByUsername(userData.username)
    if (existingUser) {
      return { success: false, message: 'Username already exists' }
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword
    })
    
    return { success: true, user: { id: user.id, username: user.username } }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'Registration failed' }
  }
}