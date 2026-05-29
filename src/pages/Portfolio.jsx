import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

const buildFilters = (projects) => {
  const categories = ['All', 'Web Apps', 'Web3', 'Landing Pages', 'Redesigns'];
  return categories.map((cat) => ({
    label: cat,
    count: cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length,
  }));
};


// ── Project card
const WorkCard = ({ project, size = 'normal' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-black/5 cursor-pointer ${size === 'large' ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = `/portfolio/${project.slug}`)}
    >
      <div className={`relative overflow-hidden ${size === 'large' ? 'h-72 md:h-96' : 'h-56 md:h-64'}`}>
        <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} />
        <motion.div className="absolute inset-0 bg-black/60 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <motion.div className="flex flex-col items-center gap-3" initial={{ y: 12, opacity: 0 }} animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
            <div className="flex items-center gap-2 text-white text-sm font-light tracking-widest uppercase">
              <span>View Project</span>
              <div className="w-8 h-px bg-white" />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </motion.div>
        </motion.div>
        <div className="absolute top-4 left-4">
          <span className="text-[10px] uppercase tracking-widest font-light px-3 py-1 rounded-full bg-white/90 text-text/70 border border-black/5">{project.category}</span>
        </div>
      </div>
      <div className="p-6 flex items-end justify-between">
        <div>
          <h3 className="font-display font-normal text-lg tracking-tight text-text mb-1">{project.title}</h3>
          <p className="text-xs font-light text-text/50 line-clamp-1 max-w-xs">{project.description}</p>
        </div>
        <div className="hidden md:flex gap-1.5 flex-wrap justify-end max-w-[160px]">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-black/4 text-text/50 border border-black/5 font-light">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};



// ── Featured hero
const FeaturedHero = ({ project }) => (
  <section className="pt-32 pb-0 px-6 bg-[#FAFAFA]">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ minHeight: '560px' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-mono text-text/30">03</span>
            <span className="text-[10px] font-mono text-text/25">//</span>
            <span className="text-[10px] uppercase tracking-widest font-light text-text/50">work</span>
          </div>
          <h1 className="font-display font-light text-text leading-[0.9] mb-8" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.05em' }}>
            My<br />Work
          </h1>
          
          <div className="border-t border-black/8 pt-8">
            <p className="text-[10px] uppercase tracking-widest text-text/35 font-light mb-3">Featured Project</p>
            <h2 className="font-display font-normal text-2xl tracking-tight text-text mb-4">{project.title}</h2>
            <motion.a href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-3" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <span className="text-xs uppercase tracking-widest font-light text-brand-500 px-5 py-2.5 border border-brand-500/30 rounded-full hover:bg-brand-500 hover:text-white transition-all duration-300">View Project</span>
              <ExternalLink size={13} className="text-brand-500 opacity-60" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mt-8 lg:mt-0"
        >
          <img
            src="/images/portfolio.png"
            alt="Portfolio preview across devices"
            className="w-full max-w-2xl object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

// ── Main page
export const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = buildFilters(projects);
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const filteredProjects = selectedFilter === 'All' ? projects : projects.filter((p) => p.category === selectedFilter);

  return (
    <>
      <Helmet>
        <title>Work — Debest.dev</title>
        <meta name="description" content="Full-stack web applications and AI-powered tools built for real problems." />
      </Helmet>

      <FeaturedHero project={featuredProject} />

      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-1 mb-14 border-b border-black/6 pb-6">
            <span className="text-xs font-light text-text/35 tracking-widest uppercase mr-3">Filter by</span>
            {filters.map(({ label, count }) => {
              const isActive = selectedFilter === label;
              return (
                <button key={label} onClick={() => setSelectedFilter(label)} className={`relative flex items-baseline gap-0.5 px-4 py-1.5 text-xs uppercase tracking-widest font-light transition-all duration-300 rounded-full ${isActive ? 'text-brand-500 bg-brand-50' : 'text-text/50 hover:text-text'}`}>
                  {label}
                  <span className={`text-[9px] font-mono align-super ml-0.5 ${isActive ? 'text-brand-500' : 'text-text/25'}`}>{String(count).padStart(2, '0')}</span>
                  {isActive && <motion.span layoutId="filterUnderline" className="absolute bottom-0 left-0 right-0 h-px bg-brand-500 rounded-full" />}
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <WorkCard key={project.slug} project={project} size={idx % 5 === 0 ? 'large' : 'normal'} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <span className="text-4xl font-display font-light text-text/10 block mb-4">✦</span>
              <p className="text-sm text-text/40 font-light">No projects in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};
