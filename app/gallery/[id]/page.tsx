"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Your central case data
const cases = [
  { id: "case-1", title: "FULL ZIRCONIA RESTORATION", type: "Crown & Bridge" },
  { id: "case-2", title: "ANTERIOR AESTHETIC CASE", type: "Cosmetic Layering" },
];

export default function CaseDetailPage() {
  const params = useParams();
  const currentCase = cases.find((c) => c.id === params.id);

  if (!currentCase) {
    return (
      <div className="p-20 text-center">
        <p className="mb-4">Case not found.</p>
        <Link href="/gallery" className="text-emerald-600 underline">Return to Gallery</Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-900 selection:text-white">
      <Navbar />

      <section className="pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header - Matching your Screenshot */}
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
              {currentCase.title} <span className="text-emerald-500 font-light italic text-4xl md:text-5xl lowercase">in detail.</span>
            </h1>
            <p className="text-slate-400 italic text-sm font-light tracking-wide">
              Technical analysis and clinical imagery.
            </p>
          </header>

          {/* Mosaic Grid - Corrected to match the 2.jpg Mosaic Layout */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[250px]">
            
            {/* 1. Large Portrait (Matches far left in 2.jpg) */}
            <div className="col-span-2 row-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 group shadow-sm">
              <Image src="/detail-1.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Technical view" />
            </div>

            {/* 2. Top Middle (Matches 2.jpg) */}
            <div className="col-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 group shadow-sm">
              <Image src="/detail-2.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Occlusal view" />
            </div>

            {/* 3. Top Right (Matches 2.jpg) */}
            <div className="col-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 group shadow-sm">
              <Image src="/detail-3.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Macro view" />
            </div>

            {/* 4. Bottom Middle (Matches 2.jpg) */}
            <div className="col-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 group shadow-sm">
              <Image src="/detail-4.jpg" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Detail view" />
            </div>

            {/* 5. Precision Text Block (Matches your custom grid requirement) */}
            <div className="col-span-2 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center border border-emerald-100 group hover:bg-emerald-100 transition-colors duration-500">
               <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700 leading-loose">
                  Precision <br /> Milling <br /> Analysis
               </p>
               {/* Decorative digital scan line */}
               <div className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 group-hover:w-full transition-all duration-700" />
            </div>

          </div>
          
          {/* Navigation */}
          <div className="mt-24 border-t border-slate-100 pt-10 flex justify-between items-center">
            <Link href="/gallery" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-emerald-600 transition-all flex items-center gap-3">
              <span className="text-lg">←</span> Back to Gallery
            </Link>
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest hidden md:block">
              Case Reference: {currentCase.id}
            </span>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}