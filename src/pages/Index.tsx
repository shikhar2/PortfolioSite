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

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Shikhar Pathak | Full-Stack Software Engineer</title>
        <meta name="description" content="Full-Stack Software Engineer specializing in Java, Spring Boot, AWS, and React. Building scalable, high-performance systems." />
      </Helmet>
      <CursorGlow />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
