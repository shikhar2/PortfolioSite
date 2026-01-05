import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: 'Full-Stack Developer',
    company: 'Google (via Hyspring)',
    period: 'Aug 2025 - Present',
    highlights: [
      'Building AI-driven analytics platform for Walmart with ML-powered insights',
      'Developed TeamSphere HR system with secure role-based access control',
      'Optimized dashboard performance and reduced UI lag',
      'Designed scalable REST APIs for enterprise-grade applications',
    ],
  },
  {
    title: 'Software Development Engineer',
    company: 'Phonon Communication',
    period: 'Mar 2023 - Jul 2025',
    highlights: [
      'Reduced billing processing time by 95% through optimized SOAP integrations',
      'Improved system response time by 40% with optimized queries and caching',
      'Achieved 80% faster data retrieval using server-side pagination',
      'Reduced email latency by 50% with AWS Pinpoint integration',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'Qurinom Solutions',
    period: 'Jul 2022 - Dec 2022',
    highlights: [
      'Built e-commerce platform enabling 100+ vendors to onboard',
      'Increased sales by 20% through optimized user experience',
      'Reduced infrastructure costs by 25% with AWS optimization',
      'Led team of 5 members in agile development',
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-3">Experience</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Work history
          </h2>

          {/* Timeline */}
          <div className="max-w-4xl space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-6 border-l-2 border-border hover:border-primary/50 transition-colors group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-md group-hover:scale-125 transition-transform" />

                {/* Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground px-3 py-1 bg-secondary/50 rounded-full">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="text-sm text-muted-foreground flex items-start gap-2 hover:text-foreground transition-colors"
                    >
                      <span className="text-accent mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
