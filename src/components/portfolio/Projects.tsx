import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Cpu } from 'lucide-react';

const projects = [
  {
    title: 'TeamSphere',
    subtitle: 'Enterprise Workforce Management Platform',
    description: 'Full-stack enterprise system serving 245+ employees with role-based dashboards for HR and agents, featuring real-time notifications and dynamic analytics.',
    techStack: ['Spring Boot', 'Next.js', 'PostgreSQL', 'WebSocket', 'TypeScript', 'Recharts'],
    highlights: [
      'Role-based dashboards for 245+ employees',
      '50+ secure REST APIs with JWT-based RBAC',
      'Real-time notifications via WebSocket (STOMP)',
      'Dynamic analytics cut manual reporting by 70%',
    ],
    github: 'https://github.com/shikhar2/teamsphere',
    demo: 'http://34.0.15.9:2002/login',
    emoji: '👥',
    accentColor: 'hsl(220, 65%, 55%)',
    accentColorDim: 'hsl(220, 65%, 55%, 0.15)',
    tag: 'Enterprise',
  },
  {
    title: 'AI Resume Screener',
    subtitle: 'Smart Recruitment Platform',
    description: 'Automated recruitment tool that uses NLP to extract and rank key information from thousands of resumes, saving 80% of initial screening time.',
    techStack: ['Python', 'FastAPI', 'PyTorch', 'NLTK', 'React', 'MongoDB'],
    highlights: [
      'TF-IDF & BERT models for semantic matching',
      'Automated ranking from customizable job descriptors',
      'High-performance parser for PDF, Docx formats',
      'Processed 5,000+ resumes with skill mapping',
    ],
    github: 'https://github.com/shikhar2/ai-resume-screener',
    demo: '',
    emoji: '🧠',
    accentColor: 'hsl(280, 60%, 60%)',
    accentColorDim: 'hsl(280, 60%, 60%, 0.15)',
    tag: 'AI / ML',
  },
  {
    title: 'Spring-Micro-Ops',
    subtitle: 'Microservices Monitoring Platform',
    description: 'Custom microservices observability platform providing real-time health metrics, log aggregation, and automated alerting for distributed Spring Boot systems.',
    techStack: ['Java', 'Spring Cloud', 'Prometheus', 'Grafana', 'ELK Stack', 'Docker'],
    highlights: [
      'Centralized dashboard for 15+ microservices',
      '50% reduction in Mean Time to Detection',
      'Automated Slack alerts for critical heap usage',
    ],
    github: 'https://github.com/shikhar2/spring-micro-ops',
    demo: '',
    emoji: '⚙️',
    accentColor: 'hsl(160, 50%, 50%)',
    accentColorDim: 'hsl(160, 50%, 50%, 0.15)',
    tag: 'DevOps',
  },
  {
    title: 'Central Web App',
    subtitle: 'Enterprise Integration Platform',
    description: 'Robust enterprise integration platform with 70+ REST APIs, Redis caching, and comprehensive error handling for high-throughput operations.',
    techStack: ['Spring Boot', 'Java', 'Angular', 'MongoDB', 'Redis'],
    highlights: [
      '70+ REST APIs for enterprise operations',
      'Redis caching for high-performance retrieval',
      'Resolved 100+ critical production bugs',
    ],
    github: 'https://github.com/shikhar2/central-web-app',
    demo: '',
    emoji: '🏗️',
    accentColor: 'hsl(35, 80%, 55%)',
    accentColorDim: 'hsl(35, 80%, 55%, 0.15)',
    tag: 'Backend',
  },
];

// 3D Flip Card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, type: 'spring', stiffness: 70 }}
      style={{ perspective: '1200px' }}
      className="h-[420px]"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: flipped ? 0 : rotateX,
          rotateY: flipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped(f => !f)}
        className="relative w-full h-full cursor-pointer"
      >
        {/* === FRONT FACE === */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Background with accent glow */}
          <div
            className="absolute inset-0 glass-strong rounded-2xl border border-white/10"
            style={{ boxShadow: `0 0 40px ${project.accentColorDim}, inset 0 1px 0 rgba(255,255,255,0.1)` }}
          />

          {/* Circuit board pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id={`circuit-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 20 15 M 20 25 L 20 40 M 0 20 L 15 20 M 25 20 L 40 20" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="20" cy="20" r="3" fill="currentColor" />
                  <rect x="12" y="12" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#circuit-${index})`} className="text-foreground" />
            </svg>
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
            {/* Header */}
            <div className="flex justify-between items-start mb-6" style={{ transform: 'translateZ(25px)' }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                style={{ background: project.accentColorDim, boxShadow: `0 4px 20px ${project.accentColorDim}` }}
              >
                {project.emoji}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: project.accentColorDim }}
                >
                  {project.tag}
                </span>
              </div>
            </div>

            {/* Title */}
            <div style={{ transform: 'translateZ(20px)' }}>
              <h3 className="text-2xl font-bold text-foreground mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-4">{project.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            <div className="flex-1" />

            {/* Tech pills */}
            <div style={{ transform: 'translateZ(30px)' }} className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md border border-border/50 bg-secondary/30 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 text-[10px] rounded-md bg-secondary/30 text-muted-foreground">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Flip hint */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-mono" style={{ transform: 'translateZ(15px)' }}>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={12} />
              </motion.div>
              click to flip
            </div>
          </div>
        </div>

        {/* === BACK FACE === */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--background) / 0.85))`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 60px ${project.accentColorDim}, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
          />

          {/* Glowing accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
          />

          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Back header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Cpu size={16} style={{ color: project.accentColor }} />
                <span className="text-sm font-mono font-semibold" style={{ color: project.accentColor }}>
                  {project.title}
                </span>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3 flex-1">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Key achievements</p>
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: project.accentColor }}
                  />
                  <span className="text-sm text-muted-foreground leading-snug">{h}</span>
                </motion.div>
              ))}
            </div>

            {/* Full tech stack */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md"
                    style={{ background: project.accentColorDim, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Flip back hint */}
            <p className="text-[10px] font-mono text-muted-foreground/40 mt-3">click to flip back</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-mono text-primary mb-3">Projects</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Featured work</h2>
          <p className="text-muted-foreground text-sm mb-12 max-w-lg">
            Click any card to flip it and see the full details.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
