'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
  Award,
  Terminal,
  Server,
  Cloud,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const features = [
    {
      title: 'Easy Registration',
      description:
        'A streamlined 3-step profile setup designed specifically for university engineering and technical students.',
      icon: Zap,
      badge: 'Step-by-Step',
    },
    {
      title: 'Secure Verification',
      description:
        'One-time university email OTP authorization ensures authentic identity verification and account protection.',
      icon: ShieldCheck,
      badge: 'Institutional Trust',
    },
    {
      title: 'Quick Process',
      description:
        'Fast 2-minute onboarding with real-time field validation, persistent data saving, and instant status updates.',
      icon: Sparkles,
      badge: 'Under 2 Mins',
    },
  ];

  const highlights = [
    {
      icon: Award,
      title: 'AWS Certification Pathways',
      desc: 'Access exclusive exam prep discounts and official student cloud challenge tracks.',
    },
    {
      icon: Server,
      title: 'Hands-on Builder Labs',
      desc: 'Deploy serverless apps, Lambda functions, and containerized architectures on AWS.',
    },
    {
      icon: Users,
      title: 'Global Builder Community',
      desc: 'Connect with collegiate AWS Cloud Club leaders, alumni mentors, and developer advocates.',
    },
    {
      icon: Terminal,
      title: 'Cloud Hackathons',
      desc: 'Compete in national collegiate buildathons with AWS computing credits and prizes.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#161D28] text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-grid-pattern py-20 lg:py-28">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Top Announcement Pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#303B4B] bg-[#1D2734]/80 px-4 py-1.5 text-xs text-[#94A3B8] backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-[#A855F7] animate-ping" />
                <span className="font-medium text-[#F8FAFC]">AWS Cloud Club 2026</span>
                <span className="text-[#303B4B]">|</span>
                <span className="text-[#A855F7]">Annual Student Intake Open</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#F8FAFC] leading-tight"
              >
                Your journey starts with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#C084FC]">
                  one registration.
                </span>
              </motion.h1>

              {/* Supporting Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto"
              >
                Step into the AWS Builder Center student portal. Verify your collegiate profile in
                minutes to unlock official workshops, cloud laboratory sandboxes, hackathon teams,
                and technical certifications.
              </motion.p>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  href="/register"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#A855F7] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#A855F7]/25 transition-all hover:bg-[#9333EA] hover:shadow-[#A855F7]/40 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#161D28] active:scale-[0.98]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#features"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#303B4B] bg-[#1D2734]/80 px-6 py-3.5 text-sm font-medium text-[#94A3B8] transition-colors hover:bg-[#263344] hover:text-[#F8FAFC]"
                >
                  <span>Learn the Process</span>
                </a>
              </motion.div>

              {/* Trust markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8]"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Free for University Students
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Instant OTP Email Verification
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Direct Student Support
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="py-16 sm:py-24 border-t border-[#303B4B] bg-[#161D28]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A855F7]">
                Registration Experience
              </h2>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
                Built for students, optimized for simplicity
              </p>
              <p className="mt-3 text-sm text-[#94A3B8]">
                Everything you need to register quickly without paperwork, complex verifications, or delay.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative flex flex-col justify-between rounded-2xl border border-[#303B4B] bg-[#1D2734] p-6 sm:p-8 transition-all hover:border-[#A855F7]/50 hover:shadow-xl hover:shadow-[#A855F7]/5 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#263344] text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors duration-200">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full bg-[#263344] px-2.5 py-1 text-[11px] font-medium text-[#94A3B8] border border-[#303B4B]">
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#F8FAFC]">{feat.title}</h3>
                      <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#303B4B]/60 flex items-center text-xs text-[#A855F7] font-medium group-hover:translate-x-0.5 transition-transform">
                      <span>Explore workflow</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Builder Highlights */}
        <section className="py-16 sm:py-24 border-t border-[#303B4B] bg-[#1D2734]/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A855F7]/15 px-3 py-1 text-xs font-semibold text-[#A855F7] border border-[#A855F7]/30">
                  <Cloud className="h-3.5 w-3.5" />
                  What You Unlock
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
                  Connect your classroom learning with real cloud engineering.
                </h2>
                <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                  As an officially registered student builder, you receive verified credentials, access
                  to hands-on cloud sandboxes, cohort-based study groups, and invitations to hackathons
                  mentored by AWS engineers.
                </p>

                <div className="mt-8">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#263344] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] border border-[#303B4B] hover:border-[#A855F7] transition-all"
                  >
                    <span>Begin Registration</span>
                    <ArrowRight className="h-4 w-4 text-[#A855F7]" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[#303B4B] bg-[#1D2734] p-5 hover:border-[#A855F7]/40 transition-colors"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263344] text-[#A855F7] mb-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#F8FAFC]">{item.title}</h4>
                      <p className="mt-1.5 text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-16 border-t border-[#303B4B] bg-grid-pattern">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl border border-[#303B4B] bg-gradient-to-b from-[#1D2734] to-[#161D28] p-8 sm:p-12 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                Ready to become an AWS Student Builder?
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] max-w-xl mx-auto">
                Complete your 3-minute registration now and join your collegiate peers today.
              </p>
              <div className="mt-6">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#A855F7] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#A855F7]/25 hover:bg-[#9333EA] transition-all"
                >
                  <span>Start Your Registration</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
