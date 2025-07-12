import { 
  users, 
  portfolioProjects, 
  contactMessages, 
  skills, 
  experiences,
  type User, 
  type InsertUser,
  type PortfolioProject,
  type InsertPortfolioProject,
  type ContactMessage,
  type InsertContactMessage,
  type Skill,
  type InsertSkill,
  type Experience,
  type InsertExperience
} from '@shared/schema'
import { db } from './db'
import { eq, desc } from 'drizzle-orm'

class DatabaseStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user || undefined
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username))
    return user || undefined
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning()
    return user
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).orderBy(desc(portfolioProjects.createdAt))
  }

  async getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined> {
    const [project] = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, id))
    return project || undefined
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const [newProject] = await db.insert(portfolioProjects).values(project).returning()
    return newProject
  }

  async updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const [updatedProject] = await db.update(portfolioProjects).set(project).where(eq(portfolioProjects.id, id)).returning()
    return updatedProject || undefined
  }

  async deletePortfolioProject(id: number): Promise<boolean> {
    const result = await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id))
    return (result.rowCount || 0) > 0
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning()
    return newMessage
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills)
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning()
    return newSkill
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db.update(skills).set(skill).where(eq(skills.id, id)).returning()
    return updatedSkill || undefined
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id))
    return (result.rowCount || 0) > 0
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences)
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(experience).returning()
    return newExperience
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updatedExperience] = await db.update(experiences).set(experience).where(eq(experiences.id, id)).returning()
    return updatedExperience || undefined
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experiences).where(eq(experiences.id, id))
    return (result.rowCount || 0) > 0
  }
}

export const storage = new DatabaseStorage()