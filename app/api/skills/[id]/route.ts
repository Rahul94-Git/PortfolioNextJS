import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertSkillSchema } from '@shared/schema'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skillId = parseInt(params.id)
    const body = await request.json()
    const skillData = insertSkillSchema.partial().parse(body)
    const skill = await storage.updateSkill(skillId, skillData)
    
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }
    
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid skill data' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skillId = parseInt(params.id)
    const deleted = await storage.deleteSkill(skillId)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 })
  }
}