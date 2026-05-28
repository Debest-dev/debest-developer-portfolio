import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Mail, MessageSquare, MapPin, Send, CheckCircle, RefreshCcw, Twitter, Linkedin, Send as TelegramIcon } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

// ── Change this to your deployed backend URL when you go live ──────────────
const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

const quickConnections = [
  {
    label: 'Email Me',
    value: 'debestcreative0@gmail.com',
    href: 'mailto:debestcreative0@gmail.com',
    icon: Mail,
  },
  {
    label: 'WhatsApp Chat',
    value: '+234 9122035664',
    href: 'https://wa.me/qr/AMKMR6UQIS6VB1',
    icon: MessageSquare,
    external: true,
  },
  {
    label: 'Twitter / X',
    value: '@DebestOnchain',
    href: 'https://x.com/DebestOnchain',
    icon: Twitter,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Debest Dev',
    href: 'https://www.linkedin.com/in/debest-dev-b72854367?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAHSsBwD5QAGr5eIRbAeEeA%3D%3D',
    icon: Linkedin,
    external: true,
  },
  {
    label: 'Telegram',
    value: '@DebestOnchain',
    href: 'https://t.me/DebestOnchain',
    icon: TelegramIcon,
    external: true,
  },
  {
    label: 'Location',
    value: 'Nigeria · Remote Worldwide',
    href: null,
    icon: MapPin,
  },
];

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.name,
          email: data.email,
          projectType: data.projectType,
          budgetRange: data.budget,
          message: data.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError('Could not reach the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmitError('');
  };

  return (
    <>
      <Helmet>
        <title>Contact — Debest.dev</title>
        <meta name="description" content="Get in touch with Blessed Anthony at Debest.dev for custom React, Next.js, and Web3 development. Available worldwide for remote projects." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-2 px-6 bg-[#FAFAFA] border-b border-black/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Contact"
            title="Available for freelance opportunities."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard className="bg-white/40 border border-black/5" hoverEffect={false}>
              {submitSuccess ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-normal tracking-tight text-text">Inquiry Sent Successfully!</h3>
                  <p className="text-xs md:text-sm text-text/60 font-light max-w-sm leading-relaxed mb-6">
                    Thank you for reaching out. I have received your message and will respond within 24 hours to schedule a detailed strategy alignment.
                  </p>
                  <Button onClick={handleReset} variant="outline" className="gap-2 text-xs font-normal">
                    <RefreshCcw size={12} /> Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text/50 font-normal">Full Name *</label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-xs focus:ring-1 focus:ring-brand-500/25 focus:border-brand-500 focus:outline-none transition-all duration-300 font-light"
                      />
                      {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text/50 font-normal">Email Address *</label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                        })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-xs focus:ring-1 focus:ring-brand-500/25 focus:border-brand-500 focus:outline-none transition-all duration-300 font-light"
                      />
                      {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text/50 font-normal">Project Type *</label>
                      <select
                        {...register("projectType", { required: "Please select a project type" })}
                        className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-xs focus:ring-1 focus:ring-brand-500/25 focus:border-brand-500 focus:outline-none transition-all duration-300 font-light text-text"
                      >
                        <option value="">Select an option...</option>
                        <option value="SaaS Landing Page">SaaS Landing Page</option>
                        <option value="Full-Stack Web App">Full-Stack Web App</option>
                        <option value="Web3 dApp / Contracts">Web3 dApp / Contracts</option>
                        <option value="System Redesign">System Redesign</option>
                        <option value="Other">Other Integration</option>
                      </select>
                      {errors.projectType && <span className="text-[10px] text-red-500">{errors.projectType.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text/50 font-normal">Budget Range *</label>
                      <select
                        {...register("budget", { required: "Please select a budget range" })}
                        className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-xs focus:ring-1 focus:ring-brand-500/25 focus:border-brand-500 focus:outline-none transition-all duration-300 font-light text-text"
                      >
                        <option value="">Select a range...</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Not Decided / Other">Not Decided / Other</option>
                      </select>
                      {errors.budget && <span className="text-[10px] text-red-500">{errors.budget.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-text/50 font-normal">Message Detail *</label>
                    <textarea
                      rows={5}
                      {...register("message", { required: "Message is required" })}
                      placeholder="Outline your startup idea, targets, and launch constraints..."
                      className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white/50 text-xs focus:ring-1 focus:ring-brand-500/25 focus:border-brand-500 focus:outline-none transition-all duration-300 font-light"
                    />
                    {errors.message && <span className="text-[10px] text-red-500">{errors.message.message}</span>}
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full justify-center gap-2 py-3.5 text-xs font-normal"
                  >
                    {isSubmitting ? "Sending Inquiry..." : "Send Message"} <Send size={12} />
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:h-full">
            <GlassCard className="bg-white/40 border border-black/5 flex flex-col gap-6" hoverEffect={false}>
              <h4 className="text-sm uppercase tracking-widest font-normal text-text/50 border-b border-black/5 pb-2">
                Quick Connections
              </h4>

              <div className="flex flex-col gap-5 text-xs font-light">
                {quickConnections.map(({ label, value, href, icon: Icon, external }) => {
                  const inner = (
                    <div className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full glass border border-black/5 flex items-center justify-center text-brand-500 shrink-0 transition-colors group-hover:bg-brand-500/10">
                        <Icon size={12} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-text/40 block">{label}</span>
                        <span className={`font-normal text-text transition-colors break-all ${href ? 'group-hover:text-brand-500' : ''}`}>
                          {value}
                        </span>
                      </div>
                    </div>
                  );

                  if (!href) return <div key={label}>{inner}</div>;

                  return (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>
            </GlassCard>
          </div>

        </div>
      </section>
    </>
  );
};
