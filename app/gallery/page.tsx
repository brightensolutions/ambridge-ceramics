"use client";

import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';

const cases = [
  { id: "case-1", title: "Full Zirconia Restoration", type: "Crown & Bridge", details: "High-translucency monolithic zirconia", image: "/case-1.jpg" },
  { id: "case-2", title: "Anterior Aesthetic Case", type: "Cosmetic Layering", details: "Hand-layered feldspathic porcelain", image: "/case-2.jpg" },
  { id: "case-3", title: "Implant Supported Bridge", type: "Implants", details: "Custom titanium base with zirconia", image: "/case-3.jpg" },
  { id: "case-4", title: "Smile Design Case", type: "Digital Planning", details: "3D guided diagnostic wax-up", image: "/case-4.jpg" },
  { id: "case-5", title: "Posterior Crown Work", type: "Functional", details: "E.max pressed lithium disilicate", image: "/case-5.jpg" },
  { id: "case-6", title: "Advanced Restoration", type: "Advanced Restoration", image: "/case-6.jpg" },
];

export default function GalleryPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-900 selection:text-white">
      <Navbar />

      {/* --- HERO: Smaller Scale --- */}
      <section className="pt-40 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 block">
                Portfolio // 2026
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                Precision <span className="font-light italic text-slate-300">In Practice.</span>
              </h1>
              <p className="max-w-lg text-base text-slate-500 font-light leading-relaxed border-l-2 border-emerald-500 pl-6">
                Clinical accuracy and hand-crafted aesthetics.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- GRID: Smaller Cards --- */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <Link href={`/gallery/${item.id}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group"
                  >
                    <div className="relative h-[240px] w-full overflow-hidden bg-slate-50">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-slate-400">
                        {item.type}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-slate-400 font-light text-[13px] italic">{item.details}</p>
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