import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Achievements } from '@/components/portfolio/Achievements';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { CursorGlow } from '@/components/ui/cursor-glow';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { StarField } from '@/components/ui/starfield';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Wrapper that gives each section a scroll-triggered 3D entrance
function Section3D({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60, rotateX: 8, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
}

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Shikhar Pathak | Full-Stack Software Engineer</title>
        <meta name="description" content="Full-Stack Software Engineer specializing in Java, Spring Boot, AWS, and React. Building scalable, high-performance systems." />
      </Helmet>

      {/* Global 3D cursor */}
      <CursorGlow />

      {/* Fixed star field behind everything */}
      <StarField />

      <div className="min-h-screen bg-background relative z-10" style={{ cursor: 'none' }}>
        <Navbar />
        <main>
          {/* Hero gets its own full 3D treatment internally */}
          <Hero />

          {/* Every section below enters with a 3D rotation from scroll */}
          <Section3D>
            <About />
          </Section3D>

          <Section3D>
            <Skills />
          </Section3D>

          <Section3D>
            <Experience />
          </Section3D>

          <Section3D>
            <Projects />
          </Section3D>

          <Section3D>
            <Achievements />
          </Section3D>

          <Section3D>
            <Contact />
          </Section3D>
        </main>
        <Footer />
      </div>

      <ScrollProgress />
    </>
  );
};

export default Index;
