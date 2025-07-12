'use server'

import { storage } from '@/lib/storage'
import { insertSkillSchema } from '@/shared/schema'
import { revalidatePath } from 'next/cache'

export async function getSkills() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, returning empty skills')
      return []
    }
    return await storage.getSkills()
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return []
  }
}

export async function createSkill(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    level: parseInt(formData.get('level') as string),
    category: formData.get('category') as string,
    iconClass: formData.get('iconClass') as string,
    color: formData.get('color') as string
  }

  try {
    const skillData = insertSkillSchema.parse(data)
    const skill = await storage.createSkill(skillData)
    
    revalidatePath('/')
    return { success: true, skill }
  } catch (error) {
    console.error('Failed to create skill:', error)
    return { success: false, message: 'Failed to create skill' }
  }
}