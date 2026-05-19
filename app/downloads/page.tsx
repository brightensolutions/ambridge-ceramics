"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import PageHeader from "../../components/PageHeader";
import { Download } from "lucide-react";

const files = [
  { title: "Shade Analysis Form", type: "PDF", size: "307 KB" },
  { title: "Smile Design Analysis Form", type: "PDF", size: "75 KB" },
  { title: "Laboratory Prescription Sheet", type: "PDF", size: "75 KB" },
];

export default function DownloadsPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-900 selection:text-white">
      <Navbar />

      {/* ─── 1. HERO SECTION (USING GLOBAL PAGE HEADER) ─── */}
      <section className="relative pt-52 pb-20 px-6 lg:px-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            badge="Downloads" 
            title="Clinical Documents" 
            subtitle="Access prescription forms, case submission sheets, and laboratory documentation to support your clinical workflow." 
          />
        </div>
      </section>

      {/* ─── 2. FILE LIST ─── */}
      <Reveal>
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-4">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-6 border border-gray-100 rounded-xl hover:border-emerald-500/30 hover:shadow-md transition-all duration-300 bg-white group"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-800 tracking-tight uppercase">
                    {file.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                    {file.type} <span className="text-gray-300 mx-1.5">//</span> {file.size}
                  </p>
                </div>

                {/* File Download Action */}
                <div className="flex shrink-0">
                  <a 
                    href={`/downloads/${file.title}.pdf`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-slate-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto rounded-md"
                  >
                    Download <Download size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ─── 3. INFO BLOCK ─── */}
      <Reveal>
        <section className="py-24 px-6 lg:px-12 bg-[#fafafa] text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Structured Case Submission
            </h2>

            <p className="text-gray-500 leading-relaxed text-base max-w-2xl mx-auto font-light">
              These documents are designed to streamline communication between
              clinicians and our laboratory. Completing prescription forms
              accurately helps ensure predictable results and efficient
              turnaround times.
            </p>
          </div>
        </section>
      </Reveal>

      <Footer />
    </main>
  );
}