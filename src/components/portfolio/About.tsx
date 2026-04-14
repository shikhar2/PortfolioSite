import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience', icon: '🏗️', color: 'hsl(220, 65%, 55%)' },
  { value: 700, suffix: '+', label: 'DSA Problems', icon: '🧠', color: 'hsl(280, 60%, 60%)' },
  { value: 95, suffix: '%', label: 'Performance Gain', icon: '⚡', color: 'hsl(160, 50%, 50%)' },
  { value: 8.9, suffix: '', label: 'GPA', icon: '🎓', color: 'hsl(35, 80%, 55%)' },
];

function StatCard({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 25, stiffness: 250 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 25, stiffness: 250 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, type: 'spring', stiffness: 80 }}
      style={{ perspective: '600px' }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'hsl(var(--background) / 0.7)',
          backdropFilter: 'blur(16px)',
          boxShadow: `0 4px 30px ${stat.color}20`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        whileHover={{ scale: 1.05 }}
        transition={{ scale: { duration: 0.2 } }}
        className="relative p-5 rounded-2xl border border-white/10 overflow-hidden cursor-default"
      >
        {/* Glow corner */}
        <div
          className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-30"
          style={{ background: stat.color }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)` }}
        />

        {/* Icon — pops out in Z */}
        <div
          className="text-2xl mb-3"
          style={{ transform: 'translateZ(20px)' }}
        >
          {stat.icon}
        </div>

        {/* Number */}
        <div
          className="text-2xl md:text-3xl font-bold font-mono mb-1"
          style={{ color: stat.color, transform: 'translateZ(15px)' }}
        >
          <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
        </div>

        {/* Label */}
        <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-primary/4 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-mono text-primary mb-3">About</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Engineer focused on scalable systems
          </h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            <p>
              I'm a Full-Stack Software Engineer with{' '}
              <span className="text-foreground font-medium">3+ years of experience</span> building
              high-performance web applications. My expertise spans{' '}
              <span className="text-foreground font-medium">Java, Spring Boot, AWS, React, and Angular</span>.
            </p>
            <p>
              Currently at{' '}
              <span className="text-foreground font-medium">Google (via Hyspring)</span>, I develop AI-driven analytics
              platforms and enterprise HR systems. Previously at Phonon Communication, I reduced billing processing
              time by 95% and improved system response times by 40%.
            </p>
            <p>
              I focus on <span className="text-foreground font-medium">performance optimization</span>, clean architecture, and
              delivering measurable business impact. B.Tech in Computer Science from GGSIPU with 8.9 GPA.
            </p>
          </div>

          {/* 3D tilt stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
