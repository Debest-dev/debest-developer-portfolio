import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowRight, Send } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-[#FAFAFA]">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      {/* Hero Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10"
      >
        {/* Left: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="glass flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/5 mb-6 bg-white/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-normal text-text/60">
              Available for Projects
            </span>
          </motion.div>

          {/* Heading H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-text tracking-tighter leading-[0.95] mb-6 font-display font-light"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            I Build Web Apps <br />
            <span className="gradient-text font-normal">That Scale.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-text/60 font-light leading-relaxed max-w-xl mb-8"
          >
            Full-stack developer helping Web2 & Web3 startups launch fast, ship clean code, and grow online.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            <Button href="/portfolio" variant="primary" className="gap-2">
              View My Work <ArrowRight size={14} />
            </Button>
            
            {/* Download CV points to a mock pdf or can just trigger download of simulated CV */}
            <Button href="/contact" variant="outline">
              Contact Me
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            <span className="text-[10px] uppercase tracking-widest text-text/40 font-light">Follow Me</span>
            <div className="flex gap-4">
              <a href="https://github.com/Debest-dev" target="_blank" rel="noopener noreferrer" className="text-text/50 hover:text-brand-500 transition-colors">
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/debest-dev-b72854367" target="_blank" rel="noopener noreferrer" className="text-text/50 hover:text-brand-500 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://x.com/DebestOnchain" target="_blank" rel="noopener noreferrer" className="text-text/50 hover:text-brand-500 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://t.me/DebestOnchain" target="_blank" rel="noopener noreferrer" className="text-text/50 hover:text-brand-500 transition-colors">
                <Send size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Specular Glowing Orb Visual */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[350px] lg:h-[450px]">
          {/* Main Anker-Style Glowing Radial Orb */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full flex items-center justify-center">
            
            {/* Specular Rim / Outer border highlight */}
            <div className="absolute inset-0 rounded-full border border-white/40 z-20 pointer-events-none shadow-[inset_0_2px_15px_rgba(255,255,255,0.4)]" />

            {/* Glowing Radial Orb with Pulse */}
            <div className="absolute inset-2 rounded-full gradient-bg opacity-30 blur-2xl z-0 animate-pulse-orb" />
            
            {/* Layered Inner Deep Gradient Sphere / Photo Container */}
            <div 
              className="absolute w-[250px] h-[250px] lg:w-[320px] lg:h-[320px] rounded-full z-10 shadow-2xl flex flex-col items-center justify-center overflow-visible"
              style={{ border: '3px solid rgba(255, 255, 255, 0.6)', background: 'transparent' }}
            >
              {/* Color shift halo — bottom layer */}
              <div 
                className="glow-halo" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '155%',
                  height: '155%',
                  maxWidth: '160%',
                  maxHeight: '160%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'conic-gradient(from 0deg, rgba(79, 70, 229, 0.15), rgba(14, 165, 233, 0.25), rgba(77, 217, 172, 0.15), rgba(79, 70, 229, 0.15))',
                  filter: 'blur(40px)',
                  animation: 'counterSpin 8s linear infinite, colorShift 8s ease-in-out infinite',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              {/* Inner pulse glow */}
              <div 
                className="glow-pulse" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '140%',
                  height: '140%',
                  maxWidth: '160%',
                  maxHeight: '160%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle, transparent 42%, rgba(79, 70, 229, 0.25) 55%, rgba(14, 165, 233, 0.20) 70%, transparent 85%)',
                  filter: 'blur(24px)',
                  animation: 'pulse 3s ease-in-out infinite alternate',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              {/* Photo — top layer */}
              <img
                src="/images/hero_image.png"
                alt="Blessed Anthony — Full Stack Developer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  display: 'block',
                  background: 'transparent',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
