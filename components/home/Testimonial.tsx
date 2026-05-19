"use client";

import Reveal from "../Reveal";
import { Star, Upload } from "lucide-react";
import Link from "next/link";

const TESTIMONIALS = [
    {
        quote: "Ambridge Ceramics has become a trusted extension of our clinical team. The restorations arrive with excellent fit, natural aesthetics and the communication is always clear from start to finish.",
        author: "Dr. James Carter",
        role: "Principal Dentist",
        clinic: "London Dental Studio",
        initials: "JC"
    },
    {
        quote: "For cosmetic and anterior cases, consistency matters. Ambridge delivers restorations with refined shade matching, beautiful surface texture and the level of detail we expect for high-value patient work.",
        author: "Dr. Priya Shah",
        role: "Cosmetic Dentist",
        clinic: "Surrey Dental Care",
        initials: "PS"
    },
    {
        quote: "The team is responsive, technically knowledgeable and reliable with turnaround times. It gives us confidence knowing we can discuss complex cases directly with experienced technicians.",
        author: "Dr. Michael Bennett",
        role: "Implant Dentist",
        clinic: "Peach Dental",
        initials: "MB"
    }
];

export default function TestimonialSection() {
    return (
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
            <div className="container mx-auto max-w-[1500px]">
                
                {/* CENTERED, BOLD, AND BIG HEADER SECTION */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Reveal>
                        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">
                            — TESTIMONIALS —
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
                            Trusted by Dental Practices <br className="hidden sm:inline"/> Across the UK
                        </h2>
                    </Reveal>
                </div>

                {/* 3-COLUMN STRUCTURED GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {TESTIMONIALS.map((item, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                            <div className="bg-white border border-gray-100 p-8 rounded-xl flex flex-col justify-between h-full min-h-[300px] shadow-sm transition-all hover:shadow-md hover:border-gray-200 relative">
                                
                                <div>
                                    {/* Top Row: One size bigger stars & Increased size of opening inverted commas */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 text-[#a2d8b2]">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} size={18} fill="currentColor" className="stroke-none" />
                                            ))}
                                        </div>
                                        <span className="text-6xl font-serif text-gray-300 pointer-events-none select-none leading-none -translate-y-1">“</span>
                                    </div>

                                    {/* Testimonial body copy formatted in all-black text */}
                                    <p className="text-black leading-relaxed text-base font-normal">
                                        {item.quote}
                                    </p>
                                </div>

                                {/* Author Metadata & Wrap Section */}
                                <div className="mt-4">
                                    {/* Increased size of closing inverted commas */}
                                    <div className="text-right w-full -mt-4 mb-2">
                                        <span className="text-6xl font-serif text-gray-300 pointer-events-none select-none leading-none">”</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        {/* Profile Circle Identity Wrap */}
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-black text-black tracking-wider">{item.initials}</span>
                                        </div>
                                        <div>
                                            {/* Author name one size bigger in deep black */}
                                            <h4 className="text-base font-black text-black leading-snug">
                                                {item.author}
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

                {/* COMPACT BRAND CTA BANNER */}
                <Reveal delay={0.3}>
                    <div className="bg-[#1A3626] rounded-xl p-8 md:p-10 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
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
    );
}