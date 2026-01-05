import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'TeamSphere HR System',
    description: 'Enterprise HR management platform with role-based access control, attendance tracking, and secure employee workflow management.',
    techStack: ['Next.js', 'Angular', 'Spring Boot', 'MySQL'],
    highlights: [
      'Role-based access with multiple permission levels',
      'Real-time attendance tracking',
      'Scalable microservices architecture',
    ],
    github: 'https://github.com/shikharpathak/teamsphere-hr',
    demo: '', // Add demo URL if available
  },
  {
    title: 'Central Web Application',
    description: 'Robust enterprise integration platform with 70+ REST APIs, Redis caching, and comprehensive error handling.',
    techStack: ['Spring Boot', 'Java', 'Angular', 'MongoDB', 'Redis'],
    highlights: [
      '70+ REST APIs for enterprise operations',
      'Redis caching for high-performance retrieval',
      'Resolved 100+ critical bugs',
    ],
    github: 'https://github.com/shikharpathak/central-web-app',
    demo: '', // Add demo URL if available
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-3">Projects</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Featured work
          </h2>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="group relative p-6 glass-strong rounded-lg hover-glow-primary transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {project.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5 font-bold">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack with staggered animation */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.2, delay: 0.3 + index * 0.1 + idx * 0.05 }}
                        className="px-2 py-0.5 text-xs font-mono bg-secondary/80 backdrop-blur-sm text-muted-foreground rounded border border-border/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:border-accent/50 hover:bg-accent/5 transition-all hover:scale-105"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
