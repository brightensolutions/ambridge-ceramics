"use client";

import Reveal from "../Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SERVICES_DATA = [
    {
        title: "CROWNS, BRIDGES &\nVENEERS",
        desc: "Advanced ceramic restorations with exceptional aesthetic detail.",
        imgSrc: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80", 
        link: "/services/crowns-bridges-veneers"
    },
    {
        title: "IMPLANT\nSOLUTIONS",
        desc: "Custom abutments and screw-retained restorations compatible with all major implant systems.",
        imgSrc: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80", 
        link: "/services/implant-solutions"
    },
    {
        title: "DIGITAL SMILE\nDESIGN",
        desc: "Comprehensive visual planning for predictable cosmetic results.",
        imgSrc: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", 
        link: "/services/digital-smile-design"
    },
    {
        title: "CLEAR ALIGNER\nSOLUTIONS",
        desc: "Orthodontic planning and aligner design tailored to your workflow.",
        imgSrc: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80", 
        link: "/services/clear-aligners"
    }
];

export default function FeaturedServices() {
    return (
        <section className="pt-16 lg:pt-20 pb-24 lg:pb-32 px-6 lg:px-12 bg-[#F8F9FA]">
            <div className="container mx-auto max-w-[1500px]">
                
                {/* Centered Header Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Reveal>
                        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">
                            — OUR EXPERTISE —
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
                            Specialist Dental <br className="hidden sm:inline" /> Laboratory Services
                        </h2>
                    </Reveal>
                </div>

                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {SERVICES_DATA.map((service, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <Link 
                                href={service.link}
                                className="group relative block bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 h-full min-h-[350px] overflow-hidden"
                            >
                                {/* Top Right Arrow */}
                                <div className="absolute top-8 right-8 z-20">
                                    <ArrowUpRight 
                                        size={24} 
                                        className="text-gray-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                                    />
                                </div>

                                {/* Content Wrap */}
                                <div className="relative z-20 max-w-[65%] sm:max-w-[55%]">
                                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug mb-4 uppercase whitespace-pre-line">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Image Wrap (Bottom Right Aligned - Image scaling removed) */}
                                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[50%] h-[60%] flex items-end justify-end pointer-events-none z-10">
                                    <img 
                                        src={service.imgSrc} 
                                        alt={service.title.replace('\n', ' ')}
                                        className="object-contain object-bottom-right w-full h-full mix-blend-multiply rounded-xl"
                                    />
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
}