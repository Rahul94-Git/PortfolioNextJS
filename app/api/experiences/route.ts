import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertExperienceSchema } from '@shared/schema'

export async function GET() {
  try {
    const experiences = await storage.getExperiences()
    return NextResponse.json(experiences)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const experienceData = insertExperienceSchema.parse(body)
    const experience = await storage.createExperience(experienceData)
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid experience data' }, { status: 400 })
  }
}