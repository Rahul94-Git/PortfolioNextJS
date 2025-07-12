import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertPortfolioProjectSchema } from '@shared/schema'

export async function GET() {
  try {
    const projects = await storage.getPortfolioProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projectData = insertPortfolioProjectSchema.parse(body)
    const project = await storage.createPortfolioProject(projectData)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    if (error instanceof Error && error.message.includes('parse')) {
      return NextResponse.json({ error: 'Invalid project data format' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}