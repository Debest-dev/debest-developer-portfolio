import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { blogPosts } from '../data/blog';

export const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog — Debest.dev</title>
        <meta name="description" content="Read full-stack tutorials, design guides, and Web3 walkthroughs written by Blessed Anthony at Debest.dev." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#FAFAFA] border-b border-black/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="My Writing"
            title="Insights & Tutorials"
            subtitle="Thoughts on building fast, scalable web apps, clean code standards, and emerging smart contract security."
            align="center"
          />
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <GlassCard
                  className="flex flex-col flex-grow items-start justify-between bg-white/40 border border-black/5"
                  hoverEffect={true}
                >
                  <div className="w-full">
                    {/* Badge and reading time */}
                    <div className="flex items-center justify-between w-full mb-4 text-[10px] text-text/45 uppercase tracking-widest font-light">
                      <Badge variant="glass">{post.category}</Badge>
                      <span>{post.readingTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-normal tracking-tight text-text mb-3 hover:text-brand-500 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs md:text-sm text-text/60 font-light leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Under block */}
                  <div className="w-full pt-4 border-t border-black/5 flex items-center justify-between text-xs font-normal">
                    <span className="text-[10px] uppercase text-text/40 font-light">{post.date}</span>
                    <Link to={`/blog/${post.slug}`} className="text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest text-[10px]">
                      Read Article →
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
