import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertContactMessageSchema } from '@shared/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messageData = insertContactMessageSchema.parse(body)
    const message = await storage.createContactMessage(messageData)
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Failed to create contact message:', error)
    if (error instanceof Error && error.message.includes('parse')) {
      return NextResponse.json({ error: 'Invalid message data format' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await storage.getContactMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Failed to fetch contact messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}