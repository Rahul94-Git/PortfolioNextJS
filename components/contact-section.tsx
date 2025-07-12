'use client'

import { useRef, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, LucideIcon } from "lucide-react";
import { submitContactMessage } from "@/lib/actions/contact";

const ContactInfo = ({ icon: Icon, title, value, color }: {
  icon: LucideIcon;
  title: string;
  value: string;
  color: string;
}) => (
  <div className="flex items-center space-x-4">
    <div className={`w-12 h-12 ${color} bg-opacity-20 rounded-full flex items-center justify-center`}>
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-muted-foreground">{value}</div>
    </div>
  </div>
);

const SocialLink = ({ href, icon: Icon, color }: {
  href: string;
  icon: LucideIcon;
  color: string;
}) => (
  <a 
    href={href}
    className={`w-12 h-12 ${color} bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110`}
  >
    <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
  </a>
);

const contactInfo = [
  { icon: Mail, title: "Email", value: "contact@portfolio.dev", color: "bg-portfolio-primary" },
  { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", color: "bg-portfolio-secondary" },
  { icon: MapPin, title: "Location", value: "San Francisco, CA", color: "bg-portfolio-accent" }
];

const socialLinks = [
  { href: "#", icon: Github, color: "bg-portfolio-primary" },
  { href: "#", icon: Linkedin, color: "bg-portfolio-secondary" },
  { href: "#", icon: Twitter, color: "bg-portfolio-accent" }
];

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactMessage(null, formData);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        formRef.current?.reset();
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-poppins mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="glass rounded-2xl interactive-element">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-primary">Send Message</h3>
              <form ref={formRef} action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{id: "name", label: "Name", placeholder: "Your name"}, 
                    {id: "email", label: "Email", placeholder: "your@email.com", type: "email"}].map(field => (
                    <div key={field.id}>
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-1"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project discussion"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="mt-1"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary hover:shadow-2xl hover:shadow-portfolio-primary/25 transition-all duration-300"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="glass rounded-2xl interactive-element">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-portfolio-secondary">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <ContactInfo key={index} {...info} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Social Links */}
            <Card className="glass rounded-2xl interactive-element">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-portfolio-success">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <SocialLink key={index} {...link} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
