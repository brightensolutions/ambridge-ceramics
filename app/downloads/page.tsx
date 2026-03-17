"use client";

import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { Download } from "lucide-react";

const files = [
  { title: "Layout 1", type: "PDF", size: "307 KB" },
  { title: "Postage-Paid-Label-AC-Premier-House", type: "PDF", size: "75 KB" },
];

export default function DownloadsPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900">
      <Navbar />

      {/* --- 1. HERO SECTION --- */}
      <section className="pt-44 pb-20 px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-4">
            Downloads
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Clinical <br /> Documents.
          </h1>

          <p className="mt-6 max-w-xl text-base text-gray-500 leading-relaxed font-light">
            Access prescription forms, case submission sheets, and laboratory
            documentation to support your clinical workflow.
          </p>
        </div>
      </section>

      {/* --- 2. FILE LIST --- */}
      <Reveal>
        <section className="py-20 px-10">
          <div className="max-w-5xl mx-auto space-y-4">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 border border-gray-100 rounded-lg hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 group"
              >
                <div>
                  <h3 className="font-bold text-base text-slate-800 tracking-tight">
                    {file.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">
                    {file.type} // {file.size}
                  </p>
                </div>

                {/* LOGIC ADDED HERE: Opens in new tab */}
                <a 
                  href={`/downloads/${file.title}.pdf`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-900 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Download <Download size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* --- 3. INFO BLOCK --- */}
      <Reveal>
        <section className="py-24 px-10 bg-[#fafafa] text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-5 tracking-tight">
              Structured Case Submission
            </h2>

            <p className="text-gray-500 leading-relaxed text-sm max-w-2xl mx-auto font-light">
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