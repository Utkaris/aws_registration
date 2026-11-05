'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cloud, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Register', href: '/register' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#303B4B] bg-[#161D28]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded-lg p-1"
          aria-label="AWS Student Portal Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] text-white shadow-lg shadow-[#A855F7]/20 transition-transform group-hover:scale-105">
            <Cloud className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base tracking-tight text-[#F8FAFC]">
                AWS Builder Center
              </span>
              <span className="rounded-full bg-[#A855F7]/15 px-2 py-0.5 text-[11px] font-medium text-[#A855F7] border border-[#A855F7]/30">
                Student
              </span>
            </div>
            <span className="text-xs text-[#94A3B8]">Registration Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Desktop Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded-md px-2 py-1 ${
                  isActive ? 'text-[#A855F7] font-semibold' : 'text-[#94A3B8]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="h-4 w-px bg-[#303B4B]" />

          <div className="flex items-center gap-2 rounded-full border border-[#303B4B] bg-[#1D2734] px-3 py-1 text-xs text-[#94A3B8]">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admissions Open 2026</span>
          </div>

          <Link
            href="/register"
            className="flex items-center gap-1.5 rounded-lg bg-[#A855F7] px-4 py-2 text-sm font-medium text-white shadow-md shadow-[#A855F7]/20 transition-all hover:bg-[#9333EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161D28] active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Join Now</span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#303B4B] bg-[#1D2734] text-[#94A3B8] transition-colors hover:text-[#F8FAFC] md:hidden focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#303B4B] bg-[#1D2734] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#263344] text-[#A855F7]'
                      : 'text-[#94A3B8] hover:bg-[#263344] hover:text-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A855F7] py-2.5 text-sm font-medium text-white shadow-md hover:bg-[#9333EA]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
