'use server'

import { storage } from '@/lib/storage'
import { insertPortfolioProjectSchema } from '@/shared/schema'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, returning empty projects')
      return []
    }
    return await storage.getPortfolioProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

export async function createProject(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    tags: formData.get('tags') ? (formData.get('tags') as string).split(',') : [],
    category: formData.get('category') as string,
    githubUrl: formData.get('githubUrl') as string,
    demoUrl: formData.get('demoUrl') as string,
    featured: formData.get('featured') === 'true'
  }

  try {
    const projectData = insertPortfolioProjectSchema.parse(data)
    const project = await storage.createPortfolioProject(projectData)
    
    revalidatePath('/')
    return { success: true, project }
  } catch (error) {
    console.error('Failed to create project:', error)
    return { success: false, message: 'Failed to create project' }
  }
}