"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import { ArrowLeft } from "lucide-react";

export default function ImplantsPage() {
  const screwRetainedProducts = [
    { name: "Anterior Crown", caption: "Single unit // Screw access", label: "Anterior", slug: "anterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
    { name: "Posterior Crown", caption: "Single unit // Screw access", label: "Posterior", slug: "posterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
    { name: "Anterior 3 Unit Bridge", caption: "3-unit span // Screw access", label: "Anterior", slug: "anterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
    { name: "Posterior 3 Unit Bridge", caption: "3-unit span // Screw access", label: "Posterior", slug: "posterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
  ];

  const cementRetainedProducts = [
    { name: "Anterior Crown", caption: "Single unit // Cement retained", label: "Anterior", slug: "anterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
    { name: "Posterior Crown", caption: "Single unit // Cement retained", label: "Posterior", slug: "posterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
    { name: "Anterior 3 Unit Bridge", caption: "3-unit span // Cement retained", label: "Anterior", slug: "anterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
    { name: "Posterior 3 Unit Bridge", caption: "3-unit span // Cement retained", label: "Posterior", slug: "posterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <main className="bg-white min-h-screen text-slate-900 font-sans selection:bg-[#a2d8b2] selection:text-[#152e1e]">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-48 pb-16 px-6 lg:px-12 overflow-hidden">
        {/* Abstract brand line circles */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] border border-[#a2d8b2]/20 rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute right-12 top-0 w-[400px] h-[400px] border border-[#a2d8b2]/20 rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb row (scaled from text-xs to text-sm) */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            <Link href="/services" className="hover:text-slate-900 transition-colors inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
            </Link>
            <span>/</span>
            <span className="text-slate-500">Implants</span>
          </div>

          {/* Blueprint Label Tag (scaled from text-[10px] to text-xs) */}
          <div className="inline-block bg-[#a2d8b2]/10 text-[#152e1e] border border-[#a2d8b2]/30 text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            • Implant Restorations
          </div>

          {/* Core Title (scaled from text-5xl/6xl to text-6xl/7xl) */}
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight text-slate-900 leading-none">
            Implants
          </h1>
          {/* Hero Paragraph (scaled from text-base/lg to text-lg/xl) */}
          <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-4xl font-light leading-relaxed">
            Precision implant solutions engineered for predictable clinical outcomes. 
            CAD/CAM custom abutments, screw-retained and cement-retained restorations, full-arch reconstructions.
          </p>
        </div>
      </section>

      {/* ─── TYPE 01: SCREW RETAINED SECTION ─── */}
      <section className="py-14 px-6 lg:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Split Heading Layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {/* Counter label (scaled from text-[10px] to text-xs) */}
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7ab88a] mb-2">Type 01</p>
              {/* Section Header (scaled from text-3xl to text-4xl) */}
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                Screw Retained
              </h2>
            </div>
            {/* Blurb block (scaled from text-sm to text-base) */}
            <p className="text-base text-slate-400 max-w-md md:text-right font-light leading-relaxed">
              Retrievable, hygienic, and ideal for anteriors. Preferred where access and aesthetics both matter.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {screwRetainedProducts.map((product, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <Link href={`/services/implants/${product.slug}`} className="group block">
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#a2d8b2]">
                    
                    {/* Top Section: Image Container Frame */}
                    <div className="h-56 bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                      {/* Floating Micro-badge (scaled from text-[9px] to text-[11px]) */}
                      <span className="absolute top-4 left-5 z-20 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white/90 backdrop-blur-sm border border-slate-100 px-2.5 py-1 rounded-md">
                        {product.label}
                      </span>
                      
                      <div className="absolute inset-0 w-full h-full p-4">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#152e1e]/5 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section: Typography Stack */}
                    <div className="p-6 bg-white">
                      {/* Product Card Title (scaled from text-sm to text-base) */}
                      <h3 className="text-base font-black uppercase tracking-wider text-slate-900 group-hover:text-[#152e1e] transition-colors mb-2">
                        {product.name}
                      </h3>
                      {/* Product Card Subtitle (scaled from text-xs to text-sm) */}
                      <p className="text-sm text-slate-400 font-light tracking-tight">
                        {product.caption}
                      </p>
                    </div>

                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TYPE 02: CEMENT RETAINED SECTION ─── */}
      <section className="py-14 pb-24 px-6 lg:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Split Heading Layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {/* Counter label (scaled from text-[10px] to text-xs) */}
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7ab88a] mb-2">Type 02</p>
              {/* Section Header (scaled from text-3xl to text-4xl) */}
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                Cement Retained
              </h2>
            </div>
            {/* Blurb block (scaled from text-sm to text-base) */}
            <p className="text-base text-slate-400 max-w-sm md:text-right font-light leading-relaxed">
              Cost-effective with superior aesthetics. Suited for cases where access angle challenges screw retention.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cementRetainedProducts.map((product, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <Link href={`/services/implants/${product.slug}`} className="group block">
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#a2d8b2]">
                    
                    {/* Top Section: Image Container Frame */}
                    <div className="h-56 bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                      {/* Floating Micro-badge (scaled from text-[9px] to text-[11px]) */}
                      <span className="absolute top-4 left-5 z-20 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-white/90 backdrop-blur-sm border border-slate-100 px-2.5 py-1 rounded-md">
                        {product.label}
                      </span>
                      
                      <div className="absolute inset-0 w-full h-full p-4">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#152e1e]/5 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section: Typography Stack */}
                    <div className="p-6 bg-white">
                      {/* Product Card Title (scaled from text-sm to text-base) */}
                      <h3 className="text-base font-black uppercase tracking-wider text-slate-900 group-hover:text-[#152e1e] transition-colors mb-2">
                        {product.name}
                      </h3>
                      {/* Product Card Subtitle (scaled from text-xs to text-sm) */}
                      <p className="text-sm text-slate-400 font-light tracking-tight">
                        {product.caption}
                      </p>
                    </div>

                  </div>
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