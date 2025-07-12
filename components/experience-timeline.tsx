import { Card, CardContent } from "@/components/ui/card";
import { Experience } from "@/shared/schema";

type ExperienceTimelineProps = {
  experiences: Experience[]
}

const defaultExperiences = [
  {
    id: 1,
    period: "2020 - Present",
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    description: "Leading development of enterprise applications using Java, SpringBoot, and React.",
    color: "bg-portfolio-primary",
    side: "left",
    startDate: new Date('2020-01-01'),
    endDate: null
  }
];

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent">
            Experience Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            8+ years of building exceptional digital experiences across various industries
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-portfolio-primary to-portfolio-secondary opacity-30" />
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {displayExperiences.map((exp, index) => (
              <div key={index} className="relative flex items-center">
                {exp.side === "left" ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <Card className="glass rounded-2xl interactive-element">
                        <CardContent className="p-6">
                          <div className={`text-sm font-semibold mb-2 ${
                            exp.color === "bg-portfolio-primary" ? "text-portfolio-primary" :
                            exp.color === "bg-portfolio-secondary" ? "text-portfolio-secondary" :
                            exp.color === "bg-portfolio-accent" ? "text-portfolio-accent" :
                            "text-portfolio-success"
                          }`}>
                            {exp.period}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                          <p className="text-muted-foreground mb-4">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${exp.color} rounded-full border-4 border-background`} />
                    <div className="w-1/2 pl-8" />
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8" />
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${exp.color} rounded-full border-4 border-background`} />
                    <div className="w-1/2 pl-8">
                      <Card className="glass rounded-2xl interactive-element">
                        <CardContent className="p-6">
                          <div className={`text-sm font-semibold mb-2 ${
                            exp.color === "bg-portfolio-primary" ? "text-portfolio-primary" :
                            exp.color === "bg-portfolio-secondary" ? "text-portfolio-secondary" :
                            exp.color === "bg-portfolio-accent" ? "text-portfolio-accent" :
                            "text-portfolio-success"
                          }`}>
                            {exp.period}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                          <p className="text-muted-foreground mb-4">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
