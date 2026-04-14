import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Full-Stack Developer',
    company: 'Google (via Hyspring)',
    period: 'Aug 2025 – Present',
    current: true,
    highlights: [
      'Building AI-driven analytics platform for Walmart with ML-powered insights',
      'Developed TeamSphere HR system with secure role-based access control',
      'Optimized dashboard performance and reduced UI lag',
      'Designed scalable REST APIs for enterprise-grade applications',
    ],
    color: 'hsl(220, 65%, 55%)',
    colorDim: 'hsl(220, 65%, 55%, 0.12)',
    logo: 'G',
  },
  {
    title: 'Software Development Engineer',
    company: 'Phonon Communication',
    period: 'Mar 2023 – Jul 2025',
    current: false,
    highlights: [
      'Reduced billing processing time by 95% through optimized SOAP integrations',
      'Improved system response time by 40% with optimized queries and caching',
      'Achieved 80% faster data retrieval using server-side pagination',
      'Reduced email latency by 50% with AWS Pinpoint integration',
    ],
    color: 'hsl(160, 50%, 50%)',
    colorDim: 'hsl(160, 50%, 50%, 0.12)',
    logo: 'P',
  },
  {
    title: 'Software Developer Intern',
    company: 'Qurinom Solutions',
    period: 'Jul 2022 – Dec 2022',
    current: false,
    highlights: [
      'Built e-commerce platform enabling 100+ vendors to onboard',
      'Increased sales by 20% through optimized user experience',
      'Reduced infrastructure costs by 25% with AWS optimization',
      'Led team of 5 members in agile development',
    ],
    color: 'hsl(35, 80%, 55%)',
    colorDim: 'hsl(35, 80%, 55%, 0.12)',
    logo: 'Q',
  },
];

function ExperienceCard({ exp, index, total }: { exp: typeof experiences[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  // Each card sits at a different Z depth — further back = smaller, creating a corridor
  const zDepth = (total - 1 - index) * -30;
  const scale = 1 - (total - 1 - index) * 0.02;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -60, rotateY: -20 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', stiffness: 70 }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        whileHover={{ z: 40, scale: 1.02, rotateY: 3 }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(${zDepth}px) scale(${scale})`,
        }}
        className="relative group"
      >
        {/* 3D depth shadow layer */}
        <div
          className="absolute inset-0 rounded-2xl -z-10"
          style={{
            transform: 'translateZ(-20px) translateY(8px) scale(0.97)',
            background: exp.color,
            opacity: 0.08,
            filter: 'blur(12px)',
          }}
        />

        {/* Main card */}
        <div
          className="relative rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: 'hsl(var(--background) / 0.85)',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 4px 40px ${exp.colorDim}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Glowing left accent bar */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
            style={{ background: exp.color }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          />

          {/* Top glow bar */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${exp.color}60, transparent)` }}
          />

          <div className="p-7" style={{ transformStyle: 'preserve-3d' }}>
            {/* Header row */}
            <div className="flex items-start justify-between mb-5" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-4">
                {/* Company logo badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg shrink-0"
                  style={{
                    background: exp.colorDim,
                    color: exp.color,
                    boxShadow: `0 4px 20px ${exp.colorDim}`,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  {exp.logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">{exp.title}</h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                {exp.current && (
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{ background: exp.colorDim, color: exp.color, border: `1px solid ${exp.color}30` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current pulse-ring" />
                    Current
                  </span>
                )}
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full">
                  <Calendar size={10} />
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-2.5" style={{ transform: 'translateZ(15px)' }}>
              {exp.highlights.map((highlight, hIndex) => (
                <motion.li
                  key={hIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.4 + hIndex * 0.07 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 shrink-0 transition-colors"
                    style={{ color: exp.color, opacity: 0.7 }}
                  />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' });

  // Scroll-linked vertical timeline line grow
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
      {/* Background depth grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,160,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-primary mb-3">Experience</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Work history</h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            3+ years building production systems at scale.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="flex gap-8 max-w-4xl" style={{ perspective: '1500px' }}>
          {/* Vertical timeline rail */}
          <div className="relative w-px shrink-0 hidden md:block">
            <div className="absolute inset-0 bg-border/40 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 0 12px hsl(var(--primary) / 0.5)',
              }}
            />
          </div>

          {/* Cards column — 3D corridor perspective */}
          <div className="flex-1 space-y-8" style={{ transformStyle: 'preserve-3d' }}>
            {experiences.map((exp, index) => (
              <div key={exp.company} className="flex gap-6 items-start">
                {/* Timeline node */}
                <div className="hidden md:flex flex-col items-center shrink-0 -ml-[calc(0.25rem+1px)]">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: exp.color,
                      background: exp.current ? exp.color : 'hsl(var(--background))',
                      boxShadow: exp.current ? `0 0 12px ${exp.color}` : 'none',
                    }}
                  >
                    {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </motion.div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <ExperienceCard exp={exp} index={index} total={experiences.length} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
