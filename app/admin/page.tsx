'use client'

import { useRef, useTransition, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createProject } from "@/lib/actions/projects"
import { createSkill } from "@/lib/actions/skills"
import { LoginForm } from "@/components/login-form"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isProjectPending, startProjectTransition] = useTransition()
  const [isSkillPending, startSkillTransition] = useTransition()
  const { toast } = useToast()
  const projectFormRef = useRef<HTMLFormElement>(null)
  const skillFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      setIsAuthenticated(response.ok)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsAuthenticated(false)
  }

  const handleProjectSubmit = async (formData: FormData) => {
    startProjectTransition(async () => {
      const result = await createProject(null, formData)
      if (result.success) {
        toast({ title: "Success", description: "Project created successfully!" })
        projectFormRef.current?.reset()
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" })
      }
    })
  }

  const handleSkillSubmit = async (formData: FormData) => {
    startSkillTransition(async () => {
      const result = await createSkill(null, formData)
      if (result.success) {
        toast({ title: "Success", description: "Skill created successfully!" })
        skillFormRef.current?.reset()
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <LoginForm onSuccess={() => setIsAuthenticated(true)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Project Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Add Project</h2>
              <form ref={projectFormRef} action={handleProjectSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input id="imageUrl" name="imageUrl" />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" placeholder="React, Next.js, TypeScript" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="">Select category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input id="githubUrl" name="githubUrl" />
                </div>
                <div>
                  <Label htmlFor="demoUrl">Demo URL</Label>
                  <Input id="demoUrl" name="demoUrl" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featured" name="featured" value="true" />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <Button type="submit" disabled={isProjectPending} className="w-full">
                  {isProjectPending ? "Adding..." : "Add Project"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Add Skill Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Add Skill</h2>
              <form ref={skillFormRef} action={handleSkillSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="skillName">Name</Label>
                  <Input id="skillName" name="name" required />
                </div>
                <div>
                  <Label htmlFor="level">Level (1-100)</Label>
                  <Input id="level" name="level" type="number" min="1" max="100" required />
                </div>
                <div>
                  <Label htmlFor="skillCategory">Category</Label>
                  <select id="skillCategory" name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="">Select category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="iconClass">Icon Class</Label>
                  <Input id="iconClass" name="iconClass" placeholder="fab fa-react" />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" placeholder="text-blue-500" />
                </div>
                <Button type="submit" disabled={isSkillPending} className="w-full">
                  {isSkillPending ? "Adding..." : "Add Skill"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}