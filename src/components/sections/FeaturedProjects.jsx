import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectCard } from '../ui/ProjectCard';
import { Button } from '../ui/Button';
import { projects } from '../../data/projects';

export const FeaturedProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Get first 3 projects as "Featured"
  const featured = projects.slice(0, 3);

  return (
    <section id="work" className="py-16 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeader
          badge="Portfolio"
          title="Featured Work"
          subtitle="A handpicked collection of full-stack web applications and dApps built for startup clients."
        />

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featured.map((project) => (
            <motion.div key={project.slug} variants={itemVariants} className="flex flex-col">
              <ProjectCard
                title={project.title}
                category={project.category}
                tags={project.tags}
                description={project.description}
                slug={project.slug}
                image={project.image}
                onClick={() => {
                  window.location.href = `/portfolio/${project.slug}`;
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* See All CTA */}
        <div className="flex justify-center">
          <Button href="/portfolio" variant="outline" className="px-8 py-3 text-xs uppercase tracking-widest font-normal">
            See All My Work →
          </Button>
        </div>
      </div>
    </section>
  );
};
