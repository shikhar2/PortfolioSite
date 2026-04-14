import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Cpu } from 'lucide-react';

// Professional projects at Google via Hyspring — no GitHub links, shown in compact grid
const professionalProjects = [
  {
    title: 'Sales UI',
    tag: 'Backend',
    emoji: '📊',
    accentColor: 'hsl(220, 65%, 55%)',
    accentColorDim: 'hsl(220, 65%, 55%, 0.12)',
    backend: 'Designed and developed backend APIs to support data tracking and reporting features. Managed database interactions and optimized queries for performance. Ensured seamless communication between frontend and backend systems.',
    impact: 'Improved internal workflow efficiency and reduced manual data handling efforts.',
  },
  {
    title: 'Kaveri 2.0',
    tag: 'Real-time',
    emoji: '📡',
    accentColor: 'hsl(160, 50%, 50%)',
    accentColorDim: 'hsl(160, 50%, 50%, 0.12)',
    backend: 'Built backend systems to ingest, process, and manage agent-generated market data. Implemented tracking mechanisms and ensured real-time data availability.',
    impact: 'Enabled better monitoring of agent activities and improved decision-making using real-time insights.',
  },
  {
    title: 'Image Visualization',
    tag: 'Media',
    emoji: '🖼️',
    accentColor: 'hsl(280, 60%, 60%)',
    accentColorDim: 'hsl(280, 60%, 60%, 0.12)',
    backend: 'Developed backend services to handle large image datasets, including processing, storage, and retrieval. Optimized performance for faster rendering.',
    impact: 'Enhanced user experience by enabling quick and clear visualization of complex image data.',
  },
  {
    title: 'Walmart CQE',
    tag: 'Audit',
    emoji: '✅',
    accentColor: 'hsl(35, 80%, 55%)',
    accentColorDim: 'hsl(35, 80%, 55%, 0.12)',
    backend: 'Created backend pipelines for search quality audits, including validation logic and error tracking systems. Automated workflows for audit completion.',
    impact: 'Ensured zero pending errors and maintained high-quality standards for data evaluation.',
  },
  {
    title: 'MEC GMB Funnel',
    tag: 'Data Pipeline',
    emoji: '🔄',
    accentColor: 'hsl(190, 60%, 50%)',
    accentColorDim: 'hsl(190, 60%, 50%, 0.12)',
    backend: 'Designed robust data ingestion pipelines for merchant data. Implemented validation checks and error handling to prevent data loss.',
    impact: 'Achieved seamless data flow with zero data loss and improved system reliability.',
  },
  {
    title: 'Product Lens',
    tag: 'Platform',
    emoji: '🔍',
    accentColor: 'hsl(340, 60%, 55%)',
    accentColorDim: 'hsl(340, 60%, 55%, 0.12)',
    backend: 'Maintained and enhanced backend services, fixed bugs, and optimized system performance. Ensured compatibility with new features.',
    impact: 'Provided a stable and reliable system with high availability.',
  },
  {
    title: 'Walmart Intelligence',
    tag: 'AI / NLP',
    emoji: '🧠',
    accentColor: 'hsl(260, 60%, 60%)',
    accentColorDim: 'hsl(260, 60%, 60%, 0.12)',
    backend: 'Developed algorithms to extract structured data from unstructured menu text. Built parsing logic and transformation pipelines.',
    impact: 'Improved data usability and enabled automation for downstream systems.',
  },
  {
    title: 'Menu Parser',
    tag: 'Parsing',
    emoji: '📋',
    accentColor: 'hsl(50, 80%, 50%)',
    accentColorDim: 'hsl(50, 80%, 50%, 0.12)',
    backend: 'Built backend logic for parsing, cleaning, and validating menu data. Ensured data consistency and accuracy.',
    impact: 'Reduced errors in data processing and improved structured data quality.',
  },
  {
    title: 'HiGrid Document Verification',
    tag: 'Verification',
    emoji: '📄',
    accentColor: 'hsl(200, 65%, 55%)',
    accentColorDim: 'hsl(200, 65%, 55%, 0.12)',
    backend: 'Developed backend workflows for document verification processes, including validation, status tracking, and error handling.',
    impact: 'Maintained high data integrity and ensured all deadlines and SLAs were met.',
  },
  {
    title: 'Search Quality Evaluation',
    tag: 'Search',
    emoji: '🔎',
    accentColor: 'hsl(160, 55%, 48%)',
    accentColorDim: 'hsl(160, 55%, 48%, 0.12)',
    backend: 'Implemented backend logic to analyze search results, identify irrelevant matches, and filter low-quality data.',
    impact: 'Improved overall search accuracy and enhanced end-user experience.',
  },
  {
    title: 'PDF Generation System',
    tag: 'GCP / CRM',
    emoji: '📑',
    accentColor: 'hsl(15, 75%, 55%)',
    accentColorDim: 'hsl(15, 75%, 55%, 0.12)',
    backend: 'Developed backend service to dynamically generate PDFs for businesses. Integrated with GCP for storage and HubSpot for CRM data management.',
    impact: 'Automated document generation and centralized data storage.',
  },
  {
    title: 'CartCrawler',
    tag: 'Scraping',
    emoji: '🕷️',
    accentColor: 'hsl(280, 55%, 58%)',
    accentColorDim: 'hsl(280, 55%, 58%, 0.12)',
    backend: 'Built a backend utility to process bulk URLs from Excel files. Integrated Crawlbase API to fetch raw HTML and enabled data download functionality.',
    impact: 'Enabled efficient and scalable data extraction for e-commerce platforms.',
  },
  {
    title: 'Ontology Project',
    tag: 'Classification',
    emoji: '🗂️',
    accentColor: 'hsl(240, 55%, 60%)',
    accentColorDim: 'hsl(240, 55%, 60%, 0.12)',
    backend: 'Designed backend systems for category mapping and classification. Created structured pipelines for data standardization.',
    impact: 'Improved consistency and enabled automation across datasets.',
  },
  {
    title: 'Amazon SP Reports',
    tag: 'Reporting',
    emoji: '📈',
    accentColor: 'hsl(30, 85%, 52%)',
    accentColorDim: 'hsl(30, 85%, 52%, 0.12)',
    backend: 'Developed backend jobs for automated report generation and scheduling. Ensured timely delivery to stakeholders.',
    impact: 'Reduced manual workload and improved reporting efficiency.',
  },
  {
    title: 'HubSpot Integration',
    tag: 'CRM',
    emoji: '🔗',
    accentColor: 'hsl(10, 70%, 55%)',
    accentColorDim: 'hsl(10, 70%, 55%, 0.12)',
    backend: 'Built backend APIs for CRM integration, enabling seamless data synchronization between systems.',
    impact: 'Improved business workflows and data accessibility.',
  },
  {
    title: 'Meta Integration',
    tag: 'Auth / Onboarding',
    emoji: '🌐',
    accentColor: 'hsl(215, 70%, 58%)',
    accentColorDim: 'hsl(215, 70%, 58%, 0.12)',
    backend: 'Developed authentication and onboarding backend systems for Meta sellers. Enabled integration with platform services.',
    impact: 'Simplified onboarding process and increased platform adoption.',
  },
];

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

          {/* ── Professional Work @ Google via Hyspring ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            {/* Sub-header */}
            <div className="flex items-center gap-4 mb-2">
              <p className="text-sm font-mono text-primary">Professional Work</p>
              <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 bg-secondary/50 rounded-full border border-border/50">
                @ Google via Hyspring
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              Enterprise projects at scale
            </h3>
            <p className="text-sm text-muted-foreground mb-10 max-w-xl">
              Backend systems built for Walmart, Amazon, Meta, and internal platforms.
              Click any card to see details.
            </p>

            {/* Compact professional project cards — 3 columns */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl">
              {professionalProjects.map((proj, index) => (
                <ProfessionalCard key={proj.title} proj={proj} index={index} />
              ))}
            </div>

            {/* Ownership & Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 max-w-4xl"
            >
              <div
                className="rounded-2xl border border-primary/20 p-6 md:p-8 relative overflow-hidden"
                style={{
                  background: 'hsl(var(--background) / 0.7)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.06)',
                }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
                  Ownership &amp; Responsibilities
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Took complete ownership of backend modules from development to deployment',
                    'Proactively identified and resolved production issues and bottlenecks',
                    'Supported releases and handled critical production incidents',
                    'Ensured high data quality, system reliability, and performance',
                    'Collaborated with cross-functional teams to deliver business requirements',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

// Compact flip card for professional projects
function ProfessionalCard({ proj, index }: { proj: typeof professionalProjects[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, type: 'spring', stiffness: 90 }}
      style={{ perspective: '900px' }}
      className="h-[200px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => setFlipped(f => !f)}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border border-white/10"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'hsl(var(--background) / 0.75)',
            backdropFilter: 'blur(14px)',
            boxShadow: `0 0 20px ${proj.accentColorDim}`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
            style={{ background: `linear-gradient(90deg, transparent, ${proj.accentColor}70, transparent)` }}
          />

          <div className="flex items-start justify-between">
            <span className="text-xl">{proj.emoji}</span>
            <span
              className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border"
              style={{ color: proj.accentColor, borderColor: `${proj.accentColor}40`, background: proj.accentColorDim }}
            >
              {proj.tag}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-1 leading-tight">{proj.title}</h4>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50 font-mono">
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>›</motion.span>
              click for details
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border border-white/10 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'hsl(var(--background) / 0.92)',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 30px ${proj.accentColorDim}`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
            style={{ background: `linear-gradient(90deg, transparent, ${proj.accentColor}, transparent)` }}
          />

          <div className="space-y-2 flex-1 overflow-hidden">
            <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: proj.accentColor }}>
              Impact
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-4">
              {proj.impact}
            </p>
          </div>

          <p className="text-[9px] font-mono text-muted-foreground/30 mt-2">click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
