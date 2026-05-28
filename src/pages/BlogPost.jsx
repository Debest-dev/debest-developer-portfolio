import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, HelpCircle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { GlassCard } from '../components/ui/GlassCard';
import { blogPosts } from '../data/blog';

export const BlogPost = () => {
  const { slug } = useParams();
  
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const post = blogPosts[currentIndex];

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center px-6">
        <Helmet>
          <title>Article Not Found — Debest.dev</title>
        </Helmet>
        <span className="text-4xl text-text/20 select-none">✦</span>
        <h2 className="text-2xl font-normal text-text mt-4">Article Not Found</h2>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-500 hover:underline">
          <ArrowLeft size={12} /> Back to Blog
        </Link>
      </div>
    );
  }

  // Next post loop
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <>
      <Helmet>
        <title>{post.title} — Debest.dev</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pt-32 pb-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-normal text-text/50 hover:text-brand-500 transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Blog
          </Link>

          {/* Hero Header */}
          <div className="mb-12 border-b border-black/5 pb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-light text-brand-500 mb-2 block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-light text-text tracking-tighter leading-tight mb-4">
              {post.title}
            </h1>
            
            {/* Meta details */}
            <div className="flex flex-wrap gap-4 items-center text-xs text-text/55 font-light">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="text-black/10">|</span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readingTime}
              </span>
            </div>
          </div>

          {/* Rich Content Area */}
          <div
            className="prose prose-stone max-w-none text-sm md:text-base text-text/75 font-light leading-relaxed mb-16 flex flex-col gap-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Next Article Recommendation */}
          <div className="pt-12 border-t border-black/5">
            <h4 className="text-xs uppercase tracking-widest text-text/45 mb-4">Suggested Reading</h4>
            <Link to={`/blog/${nextPost.slug}`}>
              <GlassCard className="bg-white/40 border border-black/5 flex items-center justify-between" hoverEffect={true}>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-light text-brand-500">{nextPost.category}</span>
                  <h5 className="text-sm md:text-base font-normal text-text tracking-tight mt-1">{nextPost.title}</h5>
                </div>
                <span className="text-brand-500 text-sm pl-4">→</span>
              </GlassCard>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};
