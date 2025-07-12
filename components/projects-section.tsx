'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { PortfolioProject } from "@/shared/schema";

type ProjectsSectionProps = {
  projects: PortfolioProject[]
}

const defaultProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with Next.js, SpringBoot, and PostgreSQL.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    tags: ["Next.js", "SpringBoot", "PostgreSQL"],
    category: "fullstack",
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
    createdAt: new Date()
  }
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" }
];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const displayProjects = projects.length > 0 ? projects : defaultProjects
  const filteredProjects = displayProjects.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing innovative solutions and technical excellence
          </p>
        </div>
        
        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 glass rounded-full transition-all duration-300 ${
                activeFilter === filter.id 
                  ? "bg-portfolio-primary text-white" 
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass rounded-2xl overflow-hidden card-3d interactive-element">
              <img 
                src={project.imageUrl || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a 
                    href={project.githubUrl || "#"} 
                    className="text-portfolio-primary hover:text-portfolio-secondary transition-colors flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a 
                    href={project.demoUrl || "#"} 
                    className="text-portfolio-primary hover:text-portfolio-secondary transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
