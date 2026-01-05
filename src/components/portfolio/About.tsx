import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 700, suffix: '+', label: 'DSA Problems' },
  { value: 95, suffix: '%', label: 'Performance Gain' },
  { value: 8.9, suffix: '', label: 'GPA' },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-3">About</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Engineer focused on scalable systems
          </h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
            <p>
              I'm a Full-Stack Software Engineer with <span className="text-foreground font-medium">3+ years of experience</span> building
              high-performance web applications. My expertise spans <span className="text-foreground font-medium">Java, Spring Boot, AWS,
                React, and Angular</span>.
            </p>
            <p>
              Currently at <span className="text-foreground font-medium">Google (via Hyspring)</span>, I develop AI-driven analytics
              platforms and enterprise HR systems. Previously at Phonon Communication, I reduced billing processing
              time by 95% and improved system response times by 40%.
            </p>
            <p>
              I focus on <span className="text-foreground font-medium">performance optimization</span>, clean architecture, and
              delivering measurable business impact. B.Tech in Computer Science from GGSIPU with 8.9 GPA.
            </p>
          </div>

          {/* Stats with animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="text-center md:text-left p-4 rounded-lg border border-border bg-gradient-to-br from-background to-secondary/30 hover:border-primary/50 hover-glow-primary transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1 font-mono">
                  <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
