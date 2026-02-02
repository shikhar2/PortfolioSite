import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import { useState, useEffect } from 'react';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Full-Stack Engineer', 'Java Developer', 'Cloud Architect', 'Problem Solver'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Particles effect */}
      <Particles />

      {/* Gradient orbs - enhanced */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Main content - full width container */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="max-w-2xl">
            {/* Terminal-style intro with shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm border border-border rounded-md font-mono text-sm text-muted-foreground shimmer">
                <span className="w-2 h-2 rounded-full bg-accent pulse-ring" />
                <span>Available for work</span>
              </div>
            </motion.div>

            {/* Name with typing animation */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight"
            >
              Shikhar Pathak
            </motion.h1>

            {/* Title with typing effect */}
            <div className="h-8 md:h-10 mb-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-primary font-mono font-medium flex items-center"
              >
                <span className="text-muted-foreground mr-2">&gt;</span>
                <span className="relative">
                  {roles[roleIndex]}
                  <motion.span
                    key={roleIndex}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-background z-10"
                  />
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-primary ml-1"
                />
              </motion.p>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              I build scalable, high-performance systems that handle real traffic.
              Currently engineering solutions at <span className="text-foreground font-medium underline decoration-primary/30">Google</span> via Hyspring.
            </motion.p>

            {/* CTAs with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-primary transition-all duration-300 hover:scale-105"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:border-primary/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </motion.div>

            {/* Social links - enhanced hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/shikharpathak', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/shikhar-pathak', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:work.shikharpathak@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right column - Code snippet decoration with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-end perspective-1000"
          >
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              className="w-full max-w-md glass-strong rounded-xl overflow-hidden shadow-2xl border-primary/20 transition-all duration-500 ease-out"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-border/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm shadow-red-400/20" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-400/20" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm shadow-green-400/20" />
                </div>
                <span className="text-xs text-muted-foreground font-mono opacity-60">Developer.java</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed bg-[#0d1117]/90">
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">1</span>
                  <span><span className="text-[#ff7b72]">public class</span> <span className="text-[#d2a8ff]">Shikhar</span> {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">2</span>
                  <span className="pl-4"><span className="text-[#ff7b72]">private</span> String role = <span className="text-[#a5d6ff]">"FullStack"</span>;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">3</span>
                  <span className="pl-4"><span className="text-[#ff7b72]">private</span> String[] tech = {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">4</span>
                  <span className="pl-12"><span className="text-[#a5d6ff]">"Spring"</span>, <span className="text-[#a5d6ff]">"AWS"</span>,</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">5</span>
                  <span className="pl-12"><span className="text-[#a5d6ff]">"React"</span>, <span className="text-[#a5d6ff]">"K8s"</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">6</span>
                  <span className="pl-4">{'}'};</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/30 select-none">7</span>
                  <span>{'}'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted-foreground"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
