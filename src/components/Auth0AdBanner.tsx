import React from 'react';
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react';

interface Auth0AdBannerProps {
  className?: string;
}

export const Auth0AdBanner: React.FC<Auth0AdBannerProps> = ({ className = '' }) => {
  return (
    <aside
      aria-label="Sponsored advertisement"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4d21cf] via-[#635dff] to-[#7a4be0] p-6 sm:p-8 text-white shadow-xl ${className}`}
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute left-1/3 -bottom-16 h-48 w-48 rounded-full bg-black/20 blur-xl" />

      {/* AD label in upper-right corner */}
      <div className="absolute top-4 right-4 z-20">
        <span className="inline-flex items-center gap-1 rounded-md border border-white/30 bg-black/30 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
          AD
        </span>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="space-y-3 max-w-3xl">
          {/* Auth0 Badge Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auth0 Shield Logo Icon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#635dff] shadow-sm">
              <ShieldCheck className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            </div>
            <span className="font-sans text-sm font-black tracking-tight text-white">
              Auth0 <span className="font-normal text-white/80">by Okta</span>
            </span>
            <span className="hidden sm:inline-block h-3.5 w-px bg-white/30" />
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-semibold text-white/90">
              <Lock className="h-3 w-3" /> Identity Platform for Developers
            </span>
          </div>

          {/* Main Messaging: Building and Securing Applications */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
            Build and secure your applications with Auth0
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-white/90 max-w-2xl font-normal">
            Authenticate, authorize, and secure your users effortlessly. Integrate Universal Login, Multi-Factor Authentication (MFA), Passkeys, and enterprise Single Sign-On (SSO) in minutes with simple SDKs.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> Free up to 7,500 active users
            </span>
            <span className="hidden sm:inline-block">•</span>
            <span>Zero configuration setup</span>
            <span className="hidden sm:inline-block">•</span>
            <span>99.99% enterprise uptime</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap md:flex-col items-stretch gap-3 shrink-0">
          <a
            href="https://auth0.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-black text-[#5025d1] transition-transform hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] shadow-md"
          >
            <span>Try Auth0 for Free</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://auth0.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-white/30 bg-black/15 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-black/30 hover:border-white/50"
          >
            <span>Read Auth0 Docs</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
