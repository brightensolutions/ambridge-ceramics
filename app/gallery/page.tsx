"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import PageHeader from "../../components/PageHeader";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const cases = [
  { id: "case-1", title: "Full Zirconia Restoration", type: "Crown & Bridge", details: "High-translucency monolithic zirconia", image: "/case-1.jpg" },
  { id: "case-2", title: "Anterior Aesthetic Case", type: "Cosmetic Layering", details: "Hand-layered feldspathic porcelain", image: "/case-2.jpg" },
  { id: "case-3", title: "Implant Supported Bridge", type: "Implants", details: "Custom titanium base with zirconia", image: "/case-3.jpg" },
  { id: "case-4", title: "Smile Design Case", type: "Digital Planning", details: "3D guided diagnostic wax-up", image: "/case-4.jpg" },
  { id: "case-5", title: "Posterior Crown Work", type: "Functional", details: "E.max pressed lithium disilicate", image: "/case-5.jpg" },
  { id: "case-6", title: "Advanced Restoration", type: "Advanced Restoration", details: "Comprehensive complex arch rehabilitation", image: "/case-6.jpg" },
];

export default function GalleryPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-900 selection:text-white">
      <Navbar />

      {/* ─── 1. HERO SECTION (GLOBAL PAGE HEADER INTEGRATION) ─── */}
      <section className="relative pt-52 pb-20 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            badge="Portfolio // 2026" 
            title="Precision In Practice" 
            subtitle="Explore our gallery of case outcomes showcasing technical clinical accuracy, advanced digital dental planning, and hand-crafted aesthetics." 
          />
        </div>
      </section>

      {/* ─── 2. CASES GRID ─── */}
      <section className="py-20 px-6 lg:px-12 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <Link href={`/gallery/${item.id}`}>
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group flex flex-col h-full"
                  >
                    {/* Image viewport container */}
                    <div className="relative h-[240px] w-full overflow-hidden bg-slate-50 shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Meta tag label pill */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 shadow-sm border border-slate-100/50">
                        {item.type}
                      </div>
                    </div>
                    
                    {/* Content copy padding box */}
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight uppercase leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 font-light text-[13px] leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                      
                      {/* Subtle elegant design footer inside the card to elevate design value */}
                      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        <span>View Details</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}