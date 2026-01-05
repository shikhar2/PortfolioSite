import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code2,
  Server,
  Cloud,
  Database,
  Coffee,
  Boxes,
  Wifi,
  Layers,
  Zap,
  GitBranch,
  Container,
  Settings
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Backend',
    skills: [
      { name: 'Java', icon: Coffee },
      { name: 'Spring Boot', icon: Boxes },
      { name: 'REST APIs', icon: Wifi },
      { name: 'Microservices', icon: Layers },
      { name: 'Redis', icon: Zap },
      { name: 'Kafka', icon: Server },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: Code2 },
      { name: 'Angular', icon: Code2 },
      { name: 'TypeScript', icon: Code2 },
      { name: 'JavaScript', icon: Code2 },
      { name: 'HTML/CSS', icon: Code2 },
      { name: 'Tailwind', icon: Code2 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: Cloud },
      { name: 'Docker', icon: Container },
      { name: 'Kubernetes', icon: Settings },
      { name: 'CI/CD', icon: GitBranch },
      { name: 'Git', icon: GitBranch },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Redis', icon: Zap },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-3">Skills</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Technical toolkit
          </h2>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + categoryIndex * 0.1 }}
                className="p-5 rounded-lg glass hover-glow-primary transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-sm font-mono text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.2 + categoryIndex * 0.1 + idx * 0.05,
                          type: 'spring',
                          stiffness: 200
                        }}
                        className="group px-3 py-2 text-sm bg-background/80 backdrop-blur-sm border border-border rounded-md text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110 cursor-default flex items-center gap-2"
                      >
                        <Icon className="w-3.5 h-3.5 text-primary group-hover:text-accent transition-colors" />
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
