import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Trophy } from 'lucide-react';

const achievements = [
  { title: 'Employee of the Quarter', subtitle: 'Performance recognition' },
  { title: 'Budding Star Award', subtitle: 'Phonon Communication' },
  { title: '700+ DSA Problems', subtitle: 'LeetCode, CodeChef, HackerRank' },
  { title: '3-Star CodeChef', subtitle: 'Competitive programming' },
  { title: '5-Star HackerRank', subtitle: 'Problem solving' },
  { title: 'Coding Club Founder', subtitle: 'DLU community' },
];

const certifications = [
  { name: 'AWS Certified Developer', issuer: 'Amazon Web Services' },
  { name: 'Machine Learning', issuer: 'Stanford University' },
  { name: 'Java Certification', issuer: 'Udemy' },
  { name: 'Web Development', issuer: 'Udemy' },
];

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-3">Recognition</p>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Achievements & Certifications
          </h2>

          <div className="max-w-4xl">
            {/* Achievements */}
            <div className="mb-12">
              <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                <Trophy size={14} className="text-accent" />
                Achievements
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    className="p-4 bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border border-border rounded-lg hover:border-accent/50 hover-glow-accent transition-all duration-300 hover:scale-105 shimmer"
                  >
                    <p className="text-sm font-medium text-foreground mb-0.5">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                <Award size={14} className="text-primary" />
                Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 glass border border-border rounded-lg hover:border-primary/50 hover-glow-primary transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-mono text-primary shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
