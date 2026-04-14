import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Full-Stack Engineer', 'Java Developer', 'Cloud Architect', 'Problem Solver'];

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Different layers move at different depths (parallax)
  const bgX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const bgY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const midX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const midY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const fgX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const fgY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const cardRotateY = useTransform(smoothX, [-1, 1], [15, -15]);
  const cardRotateX = useTransform(smoothY, [-1, 1], [-10, 10]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* === LAYER 0: Deepest background — moves most === */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-0 animated-gradient" />
        {/* Deep space grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) scaleX(2)',
            transformOrigin: 'center 80%',
          }}
        />
      </motion.div>

      {/* === LAYER 1: Mid orbs === */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: midX, y: midY }}>
        <div className="absolute top-1/5 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/5 left-1/5 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[80px]" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ rotateZ: [0, 360], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/6 w-16 h-16 border border-primary/20 rotate-45 rounded-sm"
        />
        <motion.div
          animate={{ rotateZ: [360, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/3 right-1/6 w-10 h-10 border border-accent/20 rounded-full"
        />
        <motion.div
          animate={{ rotateZ: [0, -360], y: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/3 w-6 h-6 border border-primary/15"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      </motion.div>

      {/* === LAYER 2: Particle canvas — foreground === */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: fgX, y: fgY }}>
        <ParticleField />
      </motion.div>

      {/* === LAYER 3: Main content === */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left column */}
          <motion.div style={{ x: fgX, y: fgY }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm border border-border rounded-md font-mono text-sm text-muted-foreground shimmer">
                <span className="w-2 h-2 rounded-full bg-accent pulse-ring" />
                <span>Available for work</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight"
              style={{ textShadow: '0 0 60px hsl(var(--primary) / 0.2)' }}
            >
              Shikhar{' '}
              <span className="text-gradient">Pathak</span>
            </motion.h1>

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
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
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

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              I build scalable, high-performance systems that handle real traffic.
              Currently engineering solutions at{' '}
              <span className="text-foreground font-medium underline decoration-primary/30">Google</span> via Hyspring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-primary transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                onClick={scrollToProjects}
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[gradient-shift_2s_linear_infinite]" />
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
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — 3D code card that reacts to mouse */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80 }}
            className="hidden lg:flex justify-end"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              style={{
                rotateY: cardRotateY,
                rotateX: cardRotateX,
                transformStyle: 'preserve-3d',
              }}
              className="w-full max-w-md"
            >
              {/* Main card */}
              <div
                className="glass-strong rounded-2xl overflow-visible shadow-2xl border border-primary/20 relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Floating badge — pops out in Z */}
                <motion.div
                  style={{ transform: 'translateZ(40px)' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-accent text-accent-foreground text-xs font-mono px-3 py-1.5 rounded-full shadow-lg shadow-accent/30 z-20"
                >
                  &lt;/live&gt;
                </motion.div>

                {/* Status dot — pops further */}
                <motion.div
                  style={{ transform: 'translateZ(60px)' }}
                  className="absolute -bottom-3 -left-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 shadow-lg z-20"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
                  <span className="text-xs font-mono text-muted-foreground">compiling...</span>
                </motion.div>

                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-border/50 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm shadow-red-400/20" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-400/20" />
                    <span className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm shadow-green-400/20" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono opacity-60">Developer.java</span>
                </div>

                {/* Code body */}
                <div className="p-6 font-mono text-sm leading-relaxed bg-[#0d1117]/90">
                  {[
                    { num: 1, content: <><span className="text-[#ff7b72]">public class</span> <span className="text-[#d2a8ff]">Shikhar</span> {'{'}</> },
                    { num: 2, content: <><span className="pl-4 block"><span className="text-[#ff7b72]">String</span> role = <span className="text-[#a5d6ff]">"FullStack"</span>;</span></> },
                    { num: 3, content: <><span className="pl-4 block"><span className="text-[#ff7b72]">String[]</span> tech = {'{'}</span></> },
                    { num: 4, content: <><span className="pl-8 block text-[#a5d6ff]">"Spring"</span>, <span className="text-[#a5d6ff]">"AWS"</span>,</> },
                    { num: 5, content: <><span className="pl-8 block text-[#a5d6ff]">"React"</span>, <span className="text-[#a5d6ff]">"K8s"</span></> },
                    { num: 6, content: <><span className="pl-4 block">{'}'};</span></> },
                    { num: 7, content: <></> },
                    { num: 8, content: <><span className="text-[#7ee787] pl-4 block">// @ Google via Hyspring</span></> },
                    { num: 9, content: <>{'}'}</> },
                  ].map((line, i) => (
                    <motion.div
                      key={line.num}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
                      className="flex gap-4 min-h-[1.5em]"
                    >
                      <span className="text-muted-foreground/30 select-none w-4 shrink-0">{line.num}</span>
                      <span>{line.content}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Glow reflection under card */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-xl opacity-30 rounded-full"
                  style={{ background: 'hsl(var(--primary))' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Inline particle field — 3-layer depth
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    });

    // 3 depth layers of particles
    type Particle = { x: number; y: number; z: number; size: number; speedX: number; speedY: number; opacity: number; color: string };
    const layers: Particle[][] = [[], [], []];
    const colors = [
      'rgba(120,160,255,',  // blue — far
      'rgba(100,220,180,',  // teal — mid
      'rgba(180,140,255,',  // purple — close
    ];

    [40, 25, 15].forEach((count, layerIdx) => {
      for (let i = 0; i < count; i++) {
        layers[layerIdx].push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: layerIdx,
          size: (layerIdx + 1) * 0.6 + Math.random() * 0.8,
          speedX: (Math.random() - 0.5) * (0.2 + layerIdx * 0.1),
          speedY: (Math.random() - 0.5) * (0.2 + layerIdx * 0.1),
          opacity: 0.1 + layerIdx * 0.08 + Math.random() * 0.15,
          color: colors[layerIdx],
        });
      }
    });

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      layers.forEach((layer, layerIdx) => {
        const parallaxFactor = (layerIdx + 1) * 0.3;

        layer.forEach((p, i) => {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 + layerIdx * 50) {
            p.x += (dx / dist) * parallaxFactor * 0.8;
            p.y += (dy / dist) * parallaxFactor * 0.8;
          }

          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // Connect nearby same-layer particles
          for (let j = i + 1; j < layer.length; j++) {
            const p2 = layer[j];
            const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            const maxDist = 100 + layerIdx * 20;
            if (d < maxDist) {
              ctx.beginPath();
              ctx.strokeStyle = `${p.color}${0.12 * (1 - d / maxDist)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        });
      });

      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }} />;
}
