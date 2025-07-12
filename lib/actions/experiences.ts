'use server'

import { storage } from '@/lib/storage'
import { insertExperienceSchema } from '@/shared/schema'
import { revalidatePath } from 'next/cache'

export async function getExperiences() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, returning empty experiences')
      return []
    }
    return await storage.getExperiences()
  } catch (error) {
    console.error('Failed to fetch experiences:', error)
    return []
  }
}

export async function createExperience(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: formData.get('description') as string,
    color: formData.get('color') as string,
    side: formData.get('side') as string,
    startDate: formData.get('startDate') ? new Date(formData.get('startDate') as string) : null,
    endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null
  }

  try {
    const experienceData = insertExperienceSchema.parse(data)
    const experience = await storage.createExperience(experienceData)
    
    revalidatePath('/')
    return { success: true, experience }
  } catch (error) {
    console.error('Failed to create experience:', error)
    return { success: false, message: 'Failed to create experience' }
  }
}