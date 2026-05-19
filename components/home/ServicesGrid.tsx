"use client";

import Reveal from "../Reveal";
import { ArrowUpRight, Users, Award, Cpu, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

const WHY_CHOOSE_US = [
    {
        icon: Users,
        title: "GDC Registered, Highly Experienced Technicians",
        desc: "Every member of our technical team is GDC registered and brings many years of specialist experience in ceramics, implants, digital workflows and prosthetics."
    },
    {
        icon: Award,
        title: "Award Winning Expertise",
        desc: "Our technicians have been part of multiple award winning teams, working collaboratively in the creation of award winning restorations for many years."
    },
    {
        icon: Cpu,
        title: "Digital Accuracy & Consistency",
        desc: "Advanced CAD/CAM workflows, 3D planning and strict quality control ensure accuracy, repeatability and predictable clinical outcomes across every case."
    },
    {
        icon: ShieldCheck,
        title: "Premium, Fully Traceable Materials",
        desc: "We use only CE- and UKCA-marked materials from trusted manufacturers, with full traceability for every case ensuring compliance and patient safety."
    },
    {
        icon: Clock,
        title: "Reliable Turnaround & Communication",
        desc: "Clear communication, dependable lead times and a service designed around the needs of modern clinical practice — so you can plan with confidence."
    }
];

export default function ServicesGrid() {
    return (
        <section className="pt-16 lg:pt-24 pb-20 lg:pb-32 px-6 lg:px-12 bg-white">
            <div className="container mx-auto max-w-[1500px]">

                {/* HEADER SECTION (Matched to Testimonial Component typography) */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Reveal>
                        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">
                            — WHY CHOOSE AMBRIDGE CERAMICS —
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
                            A Laboratory Built Around <br className="hidden sm:inline"/> Your Clinical Success
                        </h2>
                    </Reveal>
                </div>

                {/* 3x2 GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WHY_CHOOSE_US.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <Reveal key={index} delay={index * 0.05}>
                                <div className="bg-white border border-gray-100 p-8 rounded-xl flex flex-col justify-between h-full min-h-[260px] shadow-sm transition-all hover:shadow-md hover:border-gray-200">
                                    <div>
                                        {/* Light Neutral Icon Wrap */}
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 mb-6">
                                            <IconComponent size={20} className="text-gray-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}

                    {/* 6TH CARD: DARK FOREST GREEN CTA CARD */}
                    <Reveal delay={0.3}>
                        <div className="bg-[#1A3626] text-white p-8 rounded-xl flex flex-col justify-between h-full min-h-[260px] shadow-sm">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 mb-6">
                                    <MessageSquare size={20} className="text-white/90" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                    Ready to discuss your need?
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-sm mb-8">
                                    Our technicians are available to consult directly with clinicians on complex or high aesthetic cases before submission.
                                </p>
                            </div>

                            <div>
                                <Link
                                    href="/send-case"
                                    className="inline-flex items-center justify-center gap-2 bg-[#a2d8b2] text-[#1A3626] px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-opacity-90 transition-all group w-full sm:w-auto"
                                >
                                    Send a Case
                                    <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>

            </div>
        </section>
    );
}