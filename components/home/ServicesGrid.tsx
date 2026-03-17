"use client";

import Reveal from "../Reveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        title: "Crowns & Bridges",
        desc: "Aesthetic master-crafted restorations using Zirconia, E.max, and precious metals.",
        link: "/",
        image: "bg-gray-100" 
    },
    {
        title: "Implant Solutions",
        desc: "Custom abutments and screw-retained hybrids compatible with all major implant systems.",
        link: "/",
        image: "bg-gray-200"
    },
    {
        title: "Digital Smile Design",
        desc: "Complete treatment planning and visualization for predictable cosmetic outcomes.",
        link: "/",
        image: "bg-gray-100"
    },
    {
        title: "Clear Aligners",
        desc: "Invisible orthodontic solutions manufactured in-house for faster turnaround.",
        link: "/",
        image: "bg-gray-200"
    }
];

export default function ServicesGrid() {
    return (
        <section className="py-32 px-6 lg:px-12 bg-white">
            <div className="container mx-auto max-w-[1500px]">

                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[10px] tracking-[0.4em] uppercase font-black text-gray-400 mb-4 block">
                                Our Expertise
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                Comprehensive <br /> Digital Solutions
                            </h2>
                        </div>

                        <Link
                            href="/services"
                            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-gray-900 pb-1 hover:text-dentalForest hover:border-dentalForest transition-all"
                        >
                            View All Services
                            <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-6">
                    {SERVICES.map((service, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <Link href={service.link} className="group block relative overflow-hidden rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-500">
                                <div className="p-10 md:p-14 h-full flex flex-col justify-between min-h-[300px]">

                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-dentalForest transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                                            {service.desc}
                                        </p>
                                    </div>

                                    <div className="flex justify-end mt-10">
                                        <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-dentalForest group-hover:text-black group-hover:border-transparent transition-all">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>

                                    {/* Decorative faint background number */}
                                    <span className="absolute bottom-[-10%] left-[-5%] text-9xl font-black text-gray-200/50 pointer-events-none group-hover:translate-x-4 transition-transform duration-700">
                                        0{index + 1}
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
