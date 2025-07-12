import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertSkillSchema } from '@shared/schema'

export async function GET() {
  try {
    const skills = await storage.getSkills()
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const skillData = insertSkillSchema.parse(body)
    const skill = await storage.createSkill(skillData)
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid skill data' }, { status: 400 })
  }
}