import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Code2, Server, Cloud, Database, Coffee, Boxes,
  Wifi, Layers, Zap, GitBranch, Container, Settings
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Backend',
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
    iconColor: 'text-blue-400',
    skills: [
      { name: 'Java', icon: Coffee, level: 95 },
      { name: 'Spring Boot', icon: Boxes, level: 92 },
      { name: 'REST APIs', icon: Wifi, level: 90 },
      { name: 'Microservices', icon: Layers, level: 85 },
      { name: 'Redis', icon: Zap, level: 80 },
      { name: 'Kafka', icon: Server, level: 75 },
    ],
  },
  {
    title: 'Frontend',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    iconColor: 'text-purple-400',
    skills: [
      { name: 'React', icon: Code2, level: 90 },
      { name: 'Angular', icon: Code2, level: 82 },
      { name: 'TypeScript', icon: Code2, level: 88 },
      { name: 'JavaScript', icon: Code2, level: 90 },
      { name: 'HTML/CSS', icon: Code2, level: 92 },
      { name: 'Tailwind', icon: Code2, level: 88 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    color: 'from-teal-500/20 to-teal-600/5',
    borderColor: 'border-teal-500/30',
    glowColor: 'shadow-teal-500/20',
    iconColor: 'text-teal-400',
    skills: [
      { name: 'AWS', icon: Cloud, level: 85 },
      { name: 'Docker', icon: Container, level: 88 },
      { name: 'Kubernetes', icon: Settings, level: 75 },
      { name: 'CI/CD', icon: GitBranch, level: 80 },
      { name: 'Git', icon: GitBranch, level: 95 },
    ],
  },
  {
    title: 'Databases',
    color: 'from-orange-500/20 to-orange-600/5',
    borderColor: 'border-orange-500/30',
    glowColor: 'shadow-orange-500/20',
    iconColor: 'text-orange-400',
    skills: [
      { name: 'MySQL', icon: Database, level: 88 },
      { name: 'MongoDB', icon: Database, level: 85 },
      { name: 'PostgreSQL', icon: Database, level: 82 },
      { name: 'Redis', icon: Zap, level: 80 },
    ],
  },
];

// 3D Tilt card component
function TiltCard({ category, index, isInView }: { category: typeof skillCategories[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 25, stiffness: 200 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15, type: 'spring', stiffness: 80 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-2xl border bg-gradient-to-br ${category.color} ${category.borderColor} p-6 cursor-default transition-shadow duration-300 ${hovered ? `shadow-2xl ${category.glowColor}` : 'shadow-lg'}`}
      >
        {/* Dynamic spotlight glow that follows cursor */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary) / 0.15) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Title — floats at Z=30 */}
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          <h3 className={`text-sm font-mono font-semibold mb-5 uppercase tracking-widest flex items-center gap-2 ${category.iconColor}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {category.title}
          </h3>
        </div>

        {/* Skills list */}
        <div className="space-y-3" style={{ transform: 'translateZ(20px)' }}>
          {category.skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + idx * 0.06 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${category.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                </div>
                {/* Animated skill bar */}
                <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 + idx * 0.08, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${category.borderColor.replace('border-', 'from-').replace('/30', '/80')} to-current`}
                    style={{ background: `linear-gradient(90deg, hsl(var(--primary) / 0.8), hsl(var(--accent) / 0.6))` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corner decoration — pops out furthest */}
        <motion.div
          style={{ transform: 'translateZ(50px)' }}
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute top-4 right-4 w-6 h-6 border ${category.borderColor} rounded-md opacity-40`}
        />
      </motion.div>
    </motion.div>
  );
}

// Rotating 3D cube that sits in the section header
function SkillsCube() {
  const [face, setFace] = useState(0);
  const faces = ['Java', 'React', 'AWS', 'K8s', 'Spring', 'SQL'];
  const rotations = [
    'rotateY(0deg)',
    'rotateY(-90deg)',
    'rotateY(-180deg)',
    'rotateY(90deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)',
  ];

  useEffect(() => {
    const t = setInterval(() => setFace(f => (f + 1) % 6), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ perspective: '400px', width: 60, height: 60 }} className="inline-block">
      <motion.div
        animate={{ transform: rotations[face] }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {faces.map((label, i) => {
          const faceTransforms = [
            'translateZ(30px)',
            'rotateY(90deg) translateZ(30px)',
            'rotateY(180deg) translateZ(30px)',
            'rotateY(-90deg) translateZ(30px)',
            'rotateX(90deg) translateZ(30px)',
            'rotateX(-90deg) translateZ(30px)',
          ];
          return (
            <div
              key={label}
              style={{ transform: faceTransforms[i], transformStyle: 'preserve-3d' }}
              className="absolute inset-0 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-md text-primary text-[10px] font-mono font-bold backdrop-blur-sm"
            >
              {label}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-secondary/20 relative overflow-hidden">
      {/* 3D grid floor effect */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(120,160,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,160,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'rotateX(75deg)',
          transformOrigin: 'bottom center',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section header with 3D cube */}
          <div className="flex items-center gap-4 mb-3">
            <p className="text-sm font-mono text-primary">Skills</p>
            <SkillsCube />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Technical toolkit
          </h2>
          <p className="text-muted-foreground text-sm mb-12 max-w-lg">
            Hover the cards — they're 3D. The spotlight follows your cursor.
          </p>

          {/* 3D tilt cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <TiltCard key={category.title} category={category} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
