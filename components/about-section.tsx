import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating scalable, performant applications that make a difference
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="glass rounded-2xl interactive-element">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-portfolio-primary">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With 8+ years of experience in full-stack development, I've had the privilege of working on diverse projects ranging from enterprise applications to innovative startups. My expertise spans across modern frameworks and technologies, enabling me to deliver robust solutions that scale.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass rounded-2xl interactive-element">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-portfolio-secondary">What I Do</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in building full-stack applications using Java, SpringBoot for backend services, and React/Next.js for frontend interfaces. I'm passionate about clean code, performance optimization, and creating intuitive user experiences.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            {/* Professional stats cards */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="glass rounded-2xl text-center interactive-element">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-portfolio-primary mb-2">8+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card className="glass rounded-2xl text-center interactive-element">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-portfolio-secondary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="glass rounded-2xl text-center interactive-element">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-portfolio-accent mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </CardContent>
              </Card>
              <Card className="glass rounded-2xl text-center interactive-element">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-portfolio-success mb-2">99%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
