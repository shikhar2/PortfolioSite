import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';

export function Hero() {
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

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight"
            >
              Shikhar Pathak
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-lg md:text-xl text-muted-foreground mb-6 font-mono"
            >
              Full-Stack Engineer · Java · Spring Boot · AWS · React
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              I build scalable, high-performance systems that handle real traffic.
              Currently engineering solutions at Google via Hyspring.
            </motion.p>

            {/* CTAs with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 hover-glow-primary transition-all duration-300 hover:scale-105"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:border-primary/50 transition-all duration-300 hover:scale-105"
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
              transition={{ duration: 0.4, delay: 0.3 }}
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
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right column - Code snippet decoration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex justify-end"
          >
            <div className="w-full max-w-md glass-strong rounded-lg overflow-hidden shadow-lg hover-glow-primary transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/50 border-b border-border backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">developer.java</span>
              </div>
              <div className="p-4 font-mono text-xs text-muted-foreground leading-relaxed">
                <div><span className="text-primary font-semibold">public class</span> Developer {'{'}</div>
                <div className="pl-4"><span className="text-primary">private</span> String name = <span className="text-accent">"Shikhar"</span>;</div>
                <div className="pl-4"><span className="text-primary">private</span> int yearsExp = <span className="text-accent">3</span>;</div>
                <div className="pl-4"><span className="text-primary">private</span> String[] skills = {'{'}</div>
                <div className="pl-8"><span className="text-accent">"Java", "Spring Boot",</span></div>
                <div className="pl-8"><span className="text-accent">"AWS", "React"</span></div>
                <div className="pl-4">{'}'};</div>
                <div>{'}'}</div>
              </div>
            </div>
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
