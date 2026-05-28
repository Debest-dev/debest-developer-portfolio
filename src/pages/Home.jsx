import React from 'react';
import { Helmet } from 'react-helmet-async';

// Import homepage sections
import { HeroSection } from '../components/sections/HeroSection';
import { Marquee } from '../components/ui/Marquee';
import { AboutSnapshot } from '../components/sections/AboutSnapshot';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { SkillsSection } from '../components/sections/SkillsSection';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Testimonials } from '../components/sections/Testimonials';
import { CTABanner } from '../components/sections/CTABanner';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Debest.dev — Full-Stack Web Developer</title>
        <meta name="description" content="Full-stack developer building web applications for Web2 and Web3 startups. Available worldwide for remote projects." />
        <meta property="og:title" content="Debest.dev — Full-Stack Developer" />
        <meta property="og:description" content="Building premium web apps for Web2 & Web3 startups. Scale and performance-ready." />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>

      {/* Landing Flow */}
      <HeroSection />
      
      {/* Endless scroll text marquee ticker */}
      <Marquee />

      {/* Quick summary and stats */}
      <AboutSnapshot />

      {/* Services overview grid */}
      <ServicesGrid />

      {/* Skill levels and tools */}
      <SkillsSection />

      {/* Top projects preview */}
      <FeaturedProjects />

      {/* Testimonials social proof */}
      <Testimonials />

      {/* Call to action conversion banner */}
      <CTABanner />
    </>
  );
};
