import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { projects } from '../data/projects';

// Browser mockup frame wrapping the project image
const BrowserMockup = ({ image, title, liveUrl }) => (
  <a
    href={liveUrl && liveUrl !== '#' ? liveUrl : undefined}
    target="_blank"
    rel="noopener noreferrer"
    className={`block w-full rounded-2xl overflow-hidden border border-black/8 shadow-2xl bg-white ${liveUrl && liveUrl !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
    title={liveUrl && liveUrl !== '#' ? `Open ${title} live site` : undefined}
  >
    {/* Browser chrome bar */}
    <div className="flex items-center gap-2 px-4 py-3 bg-[#F0F0F0] border-b border-black/8">
      {/* Traffic lights */}
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>
      {/* URL bar shows real URL */}
      <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-[11px] text-text/40 font-mono border border-black/8 truncate flex items-center gap-1.5">
        {liveUrl && liveUrl !== '#' ? (
          <>
            <span className="text-green-500 text-[10px]">🔒</span>
            <span>{liveUrl.replace('https://', '')}</span>
          </>
        ) : (
          <span>debest.dev / {title.toLowerCase().replace(/\s+/g, '-')}</span>
        )}
      </div>
      {liveUrl && liveUrl !== '#' && (
        <ExternalLink size={12} className="text-text/30 flex-shrink-0" />
      )}
    </div>
    {/* Screenshot */}
    <div className="w-full h-[260px] md:h-[420px] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-top"
      />
    </div>
  </a>
);

export const ProjectDetail = () => {
  const { slug } = useParams();

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="pt-40 pb-20 text-center px-6">
        <Helmet>
          <title>Project Not Found — Debest.dev</title>
        </Helmet>
        <span className="text-4xl text-text/20 select-none">✦</span>
        <h2 className="text-2xl font-normal text-text mt-4">Project Not Found</h2>
        <Link to="/portfolio" className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-500 hover:underline">
          <ArrowLeft size={12} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Screenshots: use dedicated screenshots array if available, else fall back to main image
  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots.map((src, i) => ({ src, label: ['Dashboard View', 'Mid Section', 'Bottom Section', 'Detail View'][i] || `Screenshot ${i + 1}` }))
    : [
        { src: project.image, label: 'Dashboard View', objectPosition: 'top' },
        { src: project.image, label: 'Mid Section', objectPosition: 'center' },
        { src: project.image, label: 'Bottom Section', objectPosition: 'bottom' },
      ];

  return (
    <>
      <Helmet>
        <title>{project.title} — Debest.dev</title>
        <meta name="description" content={`${project.title}: ${project.description}`} />
      </Helmet>

      <div className="pt-32 pb-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-normal text-text/50 hover:text-brand-500 transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Portfolio
          </Link>

          {/* Hero Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-light text-brand-500 mb-2 block">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-light text-text tracking-tighter">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && project.liveUrl !== '#' ? (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="gap-2 text-xs font-normal"
                >
                  Live Preview <ExternalLink size={12} />
                </Button>
              ) : (
                <Button variant="primary" className="gap-2 text-xs font-normal opacity-50 cursor-not-allowed">
                  Live Preview <ExternalLink size={12} />
                </Button>
              )}
              {/* Source Code button — only show if githubUrl is a real public repo, not a placeholder */}
              {project.githubUrl && project.githubUrl !== 'https://github.com' && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="gap-2 text-xs font-normal"
                >
                  Source Code <Github size={12} />
                </Button>
              )}
            </div>
          </div>

          {/* Browser Mockup Hero — clicking opens live site */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <BrowserMockup image={project.image} title={project.title} liveUrl={project.liveUrl} />
          </motion.div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left: narrative */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <h3 className="uppercase text-xs tracking-widest text-text/45 border-b border-black/5 pb-2 mb-3">
                  Overview
                </h3>
                <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="uppercase text-xs tracking-widest text-text/45 border-b border-black/5 pb-2 mb-3">
                  The Challenge
                </h3>
                <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h3 className="uppercase text-xs tracking-widest text-text/45 border-b border-black/5 pb-2 mb-3">
                  The Architecture & Solution
                </h3>
                <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Right: metadata */}
            <div className="lg:col-span-5">
              <GlassCard className="bg-white/40 border border-black/5 flex flex-col gap-6" hoverEffect={false}>
                <h4 className="text-sm uppercase tracking-widest font-normal text-text/50 border-b border-black/5 pb-2">
                  Project Metadata
                </h4>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-text/40 font-light block">Client</span>
                    <span className="font-normal text-text">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text/40 font-light block">Timeline</span>
                    <span className="font-normal text-text">{project.timeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text/40 font-light block">Role</span>
                    <span className="font-normal text-text">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text/40 font-light block">Category</span>
                    <span className="font-normal text-text">{project.category}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-text/40 font-light block mb-2">Technologies Used</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="glass">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Metrics */}
          <div className="mb-16">
            <h3 className="text-xs uppercase tracking-widest text-text/40 border-b border-black/5 pb-2 mb-8">
              Metrics & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.metrics.map((metric, idx) => (
                <GlassCard key={idx} className="bg-white/40 border border-black/5 text-center flex flex-col gap-2" hoverEffect={true}>
                  <span className="text-3xl font-display font-light text-brand-500 tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-text/50">
                    {metric.label}
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Screenshots Gallery */}
          <div className="mb-20">
            <h3 className="text-xs uppercase tracking-widest text-text/40 border-b border-black/5 pb-2 mb-8">
              System Screenshots
            </h3>
            <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
              {screenshots.map(({ src, label, objectPosition = 'top' }, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] md:min-w-[380px] h-52 rounded-2xl border border-black/5 overflow-hidden flex-shrink-0 relative group"
                >
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/40 to-transparent">
                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-light">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="pt-8 border-t border-black/5 flex items-center justify-between">
            <Link to={`/portfolio/${prevProject.slug}`} className="group flex flex-col items-start gap-1">
              <span className="text-[10px] uppercase tracking-widest text-text/40 font-light">Previous Project</span>
              <span className="text-sm font-normal text-text group-hover:text-brand-500 transition-colors">
                ← {prevProject.title}
              </span>
            </Link>

            <Link to={`/portfolio/${nextProject.slug}`} className="group flex flex-col items-end gap-1">
              <span className="text-[10px] uppercase tracking-widest text-text/40 font-light">Next Project</span>
              <span className="text-sm font-normal text-text group-hover:text-brand-500 transition-colors">
                {nextProject.title} →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};
