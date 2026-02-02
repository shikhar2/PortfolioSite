import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'TeamSphere – Enterprise Workforce Management Platform',
    description: 'Full-stack enterprise system serving 245+ employees with role-based dashboards for HR and agents, featuring real-time notifications and dynamic analytics.',
    techStack: ['Spring Boot', 'Next.js', 'PostgreSQL', 'WebSocket', 'TypeScript', 'Recharts'],
    highlights: [
      'Architected system with role-based dashboards for 245+ employees',
      'Developed 50+ secure REST APIs with JWT-based RBAC',
      'Built real-time notifications using WebSocket (STOMP)',
      'Implemented dynamic analytics dashboards, cutting manual reporting by 70%',
    ],
    github: 'https://github.com/shikhar2/teamsphere',
    demo: 'http://34.0.15.9:2002/login',
  },
  {
    title: 'AI Resume Screener – Smart Recruitment Platform',
    description: 'Developed an automated recruitment tool that uses NLP to extract and rank key information from thousands of resumes, saving 80% of initial screening time.',
    techStack: ['Python', 'FastAPI', 'PyTorch', 'NLTK', 'React', 'MongoDB'],
    highlights: [
      'Implemented TF-IDF and BERT models for intelligent semantic matching',
      'Developed automated ranking systems based on customizable job descriptors',
      'Built a high-performance parsing engine for multiple document formats (PDF, Docx)',
      'Processed over 5,000 resumes with categorized skill mapping',
    ],
    github: 'https://github.com/shikhar2/ai-resume-screener',
    demo: '',
  },
  {
    title: 'Spring-Micro-Ops Monitoring',
    description: 'Custom microservices observability platform providing real-time health metrics, log aggregation, and automated alerting for distributed Spring Boot systems.',
    techStack: ['Java', 'Spring Cloud', 'Prometheus', 'Grafana', 'ELK Stack', 'Docker'],
    highlights: [
      'Built a centralized dashboard for 15+ microservices',
      'Reduced MTTD (Mean Time to Detection) of system failures by 50%',
      'Implemented automated slack alerts for critical heap usage levels',
    ],
    github: 'https://github.com/shikhar2/spring-micro-ops',
    demo: '',
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
    github: 'https://github.com/shikhar2/central-web-app',
    demo: '',
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
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col h-full glass-strong rounded-2xl border-primary/10 hover-glow-primary transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background decorative element */}
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Category / Icon placeholder */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      {project.title.includes('AI') ? '🧠' : project.title.includes('HR') || project.title.includes('Team') ? '👥' : '⚙️'}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {project.description}
                  </p>

                  {/* Highlights (mini list) */}
                  <div className="space-y-2 mb-8 flex-grow">
                    {project.highlights.slice(0, 3).map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-accent/60" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-secondary/50 text-muted-foreground rounded-md border border-border/50 group-hover:border-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
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
