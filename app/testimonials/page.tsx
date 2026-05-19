"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import PageHeader from "../../components/PageHeader";
import { Star, Upload } from "lucide-react";

// Clinician data configured cleanly with roles and auto-initials processing
const testimonials = [
  {
    name: "Dr. James Walker",
    role: "Principal Dentist",
    clinic: "Walker Dental Clinic",
    initials: "JW",
    text: "Ambridge Ceramics consistently delivers restorations with exceptional precision. Their turnaround time and communication make them a reliable clinical partner.",
  },
  {
    name: "Dr. Emily Carter",
    role: "Cosmetic Dentist",
    clinic: "Carter & Co. Dental",
    initials: "EC",
    text: "The quality of crown and bridge work is outstanding. Marginal fit and aesthetics are always on point, even for complex cases.",
  },
  {
    name: "Dr. Daniel Hughes",
    role: "Implant Specialist",
    clinic: "Hughes Implant Centre",
    initials: "DH",
    text: "Their implant restorations have been consistently accurate and predictable. A dependable laboratory we trust for high-value cases.",
  },
  {
    name: "Dr. Sophie Bennett",
    role: "Clinical Director",
    clinic: "Smile Design Studio",
    initials: "SB",
    text: "From digital planning to final delivery, the workflow is seamless. Patients love the aesthetic results.",
  },
  {
    name: "Dr. Michael Reed",
    role: "Restorative Dentist",
    clinic: "Precision Dental Care",
    initials: "MR",
    text: "Professional, responsive, and technically strong. We consider them an extension of our clinical team.",
  },
  {
    name: "Dr. Olivia Turner",
    role: "Principal Associate",
    clinic: "Turner Dental Practice",
    initials: "OT",
    text: "Excellent craftsmanship and reliable service. Their attention to detail truly sets them apart.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-900 selection:text-white">
      <Navbar />

      {/* ─── 1. HERO SECTION (GLOBAL PAGE HEADER INTEGRATION) ─── */}
      <section className="relative pt-52 pb-16 px-6 lg:px-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            badge="Testimonials" 
            title="Trusted By Clinicians" 
            subtitle="Feedback from dental professionals who rely on our laboratory for precision restorations, consistent quality, and dependable clinical support." 
          />
        </div>
      </section>

      {/* ─── 2. HIGH-AESTHETIC TESTIMONIAL GRID ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-[1500px] space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="bg-white border border-gray-100 p-8 rounded-xl flex flex-col justify-between h-full min-h-[320px] shadow-sm transition-all hover:shadow-md hover:border-gray-200 relative">
                  
                  <div>
                    {/* Top Row: Aesthetic Star Ratings & Oversized Opening Quote */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-[#a2d8b2]">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={18} fill="currentColor" className="stroke-none" />
                        ))}
                      </div>
                      <span className="text-6xl font-serif text-gray-300 pointer-events-none select-none leading-none -translate-y-1">“</span>
                    </div>

                    {/* Testimonial Core Body Copy */}
                    <p className="text-black leading-relaxed text-base font-normal">
                      {item.text}
                    </p>
                  </div>

                  {/* Author Metadata Section Wrapper */}
                  <div className="mt-4">
                    {/* Positioned Closing Quote Decoration */}
                    <div className="text-right w-full -mt-4 mb-2">
                      <span className="text-6xl font-serif text-gray-300 pointer-events-none select-none leading-none">”</span>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      {/* Monogram / Profile Branding Block */}
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-black tracking-wider">
                          {item.initials}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-black text-black leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-bold tracking-wide mt-0.5 uppercase">
                          {item.role} — {item.clinic}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          {/* ─── 3. BRAND CTA BANNER SECTION ─── */}
          <Reveal delay={0.2}>
            <div className="bg-[#1A3626] rounded-xl p-8 md:p-10 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm mt-16">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase">
                  Ready to submit your case?
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Submit digitally or request a collection. Our clinical team will review your prescription and confirm turnaround workflows within 24 hours.
                </p>
              </div>
              
              <div className="w-full lg:w-auto shrink-0">
                <Link
                  href="/send-case"
                  className="inline-flex items-center justify-center gap-2 bg-[#a2d8b2] text-[#1A3626] px-7 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-opacity-90 transition-all group w-full sm:w-auto"
                >
                  <Upload size={16} className="stroke-[2.5]" />
                  Send a Case
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <Footer />
    </main>
  );
}