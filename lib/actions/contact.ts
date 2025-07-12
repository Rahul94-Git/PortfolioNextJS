'use server'

import { db } from '@/lib/db'
import { contactMessages, insertContactMessageSchema } from '@/shared/schema'
import { revalidatePath } from 'next/cache'

export async function submitContactMessage(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, simulating message send')
      return { success: true, message: 'Message sent successfully! (Demo mode)' }
    }
    
    const validatedData = insertContactMessageSchema.parse(data)
    
    await db.insert(contactMessages).values(validatedData)
    
    revalidatePath('/')
    
    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, message: 'Failed to send message. Please try again.' }
  }
}
