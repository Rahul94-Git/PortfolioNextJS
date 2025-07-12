import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-portfolio-primary rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-portfolio-secondary rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-portfolio-accent rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-6 leading-tight">
            <span className="bg-gradient-to-r from-portfolio-primary via-portfolio-secondary to-portfolio-accent bg-clip-text text-transparent">
              Senior Full Stack
            </span>
            <br />
            <span className="text-foreground">Developer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with 8+ years of expertise in{" "}
            <span className="text-portfolio-primary font-semibold">Java</span>,{" "}
            <span className="text-portfolio-secondary font-semibold">SpringBoot</span>,{" "}
            <span className="text-portfolio-accent font-semibold">React</span>, and{" "}
            <span className="text-portfolio-success font-semibold">Next.js</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-portfolio-primary/25 transition-all duration-300 transform hover:scale-105 interactive-element"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 glass rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 interactive-element"
            >
              Download Resume
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full animate-pulse mt-2"></div>
        </div>
      </div>
    </section>
  );
}
