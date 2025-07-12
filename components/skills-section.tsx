'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useState } from "react";
import { Skill } from "@/shared/schema";

type SkillsSectionProps = {
  skills: Skill[]
}

const technologies = [
  { icon: "fab fa-react", color: "text-portfolio-accent" },
  { icon: "fab fa-angular", color: "text-portfolio-danger" },
  { icon: "fab fa-java", color: "text-portfolio-warning" },
  { icon: "fab fa-node-js", color: "text-portfolio-success" },
  { icon: "fab fa-docker", color: "text-portfolio-primary" },
  { icon: "fab fa-aws", color: "text-portfolio-secondary" },
  { icon: "fab fa-git-alt", color: "text-portfolio-accent" },
  { icon: "fas fa-database", color: "text-portfolio-success" },
];

function SkillBar({ skill, isVisible }: { skill: { name: string; level: number }; isVisible: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !animated) {
      const timer = setTimeout(() => setAnimated(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, animated]);

  return (
    <div className="skill-item">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary transition-all duration-1000 ease-out ${
            animated ? 'skill-progress animate' : 'skill-progress'
          }`}
          style={{ width: animated ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  
  const frontendSkills = skills.filter(skill => skill.category === 'frontend')
  const backendSkills = skills.filter(skill => skill.category === 'backend')
  
  // Fallback data if no skills from database
  const defaultFrontend = frontendSkills.length > 0 ? frontendSkills : [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "Angular", level: 88 },
    { name: "TypeScript", level: 92 },
  ]
  
  const defaultBackend = backendSkills.length > 0 ? backendSkills : [
    { name: "Java", level: 98 },
    { name: "SpringBoot", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "Database Design", level: 90 },
  ]

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mastering the art of modern web development with cutting-edge technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Frontend Skills */}
          <Card className="glass rounded-2xl interactive-element">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-primary">Frontend Technologies</h3>
              <div className="space-y-6">
                {defaultFrontend.map((skill, index) => (
                  <SkillBar key={index} skill={skill} isVisible={isVisible} />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Backend Skills */}
          <Card className="glass rounded-2xl interactive-element">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-secondary">Backend Technologies</h3>
              <div className="space-y-6">
                {defaultBackend.map((skill, index) => (
                  <SkillBar key={index} skill={skill} isVisible={isVisible} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Technology Icons */}
        <Card className="mt-16 glass rounded-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-8 text-center text-portfolio-accent">Technologies I Work With</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="w-16 h-16 glass rounded-xl flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-110"
                >
                  <i className={`${tech.icon} text-2xl ${tech.color}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
