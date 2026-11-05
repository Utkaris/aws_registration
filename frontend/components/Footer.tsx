import React from 'react';
import Link from 'next/link';
import { Cloud, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-[#303B4B] bg-[#161D28] text-[#94A3B8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3 text-[#F8FAFC]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] text-white shadow-md shadow-[#A855F7]/20">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-[#F8FAFC]">
                  AWS Builder Center
                </span>
                <span className="rounded-full bg-[#A855F7]/15 px-2 py-0.5 text-[10px] font-medium text-[#A855F7] border border-[#A855F7]/30">
                  Student Portal
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Empowering collegiate cloud architects and engineers
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs" aria-label="Footer Navigation">
            <Link href="/" className="text-[#94A3B8] transition-colors hover:text-[#F8FAFC]">
              Home
            </Link>
            <Link href="/register" className="text-[#94A3B8] transition-colors hover:text-[#A855F7]">
              Registration
            </Link>
            <a
              href="https://aws.amazon.com/developer/community/students/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            >
              <span>AWS Students</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-[#94A3B8]">
            © {currentYear} AWS Builder Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
