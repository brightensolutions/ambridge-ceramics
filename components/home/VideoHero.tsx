"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

export default function VideoHero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black text-white px-6">
      
      {/* ─── BACKGROUND VIDEO LAYER ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
          // Replace with your preferred architectural, digital workflow, or production video asset link
          src="/drone-video.mp4" 
        />
        {/* Decreased opacity dark vignette overlay to ensure the background video remains completely clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ─── CENTRAL CONTENT OVERLAY ─── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        
        {/* Micro-Badges Row */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 mb-8">
            <span>Premium Dental Restorations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            <span>Digital Workflows</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            <span>Fully Traceable Quality</span>
          </div>
        </Reveal>

        {/* Master H1 Title (Decreased by two sizes for clean UI density) */}
        <Reveal delay={0.1}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase text-white mb-8">
            Tailored Solutions <br />
            For Digital and Analogue <br />
            Workflows
          </h1>
        </Reveal>

        {/* Action Button Links */}
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 w-full max-w-md sm:max-w-none">
            <Link
              href="/send-case"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-slate-950 px-10 py-4 rounded-md font-black uppercase tracking-wider text-sm hover:bg-emerald-400 transition-all duration-300 group shadow-lg shadow-emerald-500/20"
            >
              Send a Case
              <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform stroke-[3]" />
            </Link>
            
            <Link
              href="/services"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-md font-black uppercase tracking-wider text-sm hover:bg-white hover:text-slate-950 transition-all duration-300 group"
            >
              View Services
              <ArrowUpRight size={18} className="text-white/60 group-hover:text-inherit group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform stroke-[3]" />
            </Link>
          </div>
        </Reveal>

        {/* Brand Signatures Row */}
      

      </div>

     
      
      
    </section>
  );
}