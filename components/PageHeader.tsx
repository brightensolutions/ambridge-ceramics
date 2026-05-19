"use client";

import React from "react";
import Reveal from "./Reveal";

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-16 max-w-5xl mx-auto px-4">
      <Reveal>
        <span className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">
          — {badge} —
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none uppercase break-words">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mt-6 max-w-3xl mx-auto">
            "{subtitle}"
          </p>
        </Reveal>
      )}
    </div>
  );
}