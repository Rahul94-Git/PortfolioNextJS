import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertExperienceSchema } from '@shared/schema'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experienceId = parseInt(params.id)
    const body = await request.json()
    const experienceData = insertExperienceSchema.partial().parse(body)
    const experience = await storage.updateExperience(experienceId, experienceData)
    
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid experience data' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experienceId = parseInt(params.id)
    const deleted = await storage.deleteExperience(experienceId)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 })
  }
}