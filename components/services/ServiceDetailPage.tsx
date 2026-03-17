"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Layers, Workflow } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Reveal from "../Reveal";

type ServiceData = {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    category: string;
    benefits: string[];
    materials: string[];
    workflow: string[];
};

type Props = {
    service: ServiceData;
    otherServices: { slug: string; title: string; category: string }[];
};

export default function ServiceDetailPage({ service, otherServices }: Props) {
    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-40 pb-32 px-6 lg:px-12 overflow-hidden">
                {/* Background watermark */}
                <span className="absolute -top-10 right-0 text-[20vw] font-black uppercase text-gray-50 -z-10 pointer-events-none select-none tracking-tighter leading-none">
                    {service.category}
                </span>

                <div className="container mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-3 mb-8">
                            <Link
                                href="/services"
                                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-dentalForest transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft size={14} />
                                All Services
                            </Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-dentalGold">
                                {service.category}
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-black mb-6">
                            {service.title}
                        </h1>

                        <p className="text-xl md:text-2xl font-light text-gray-500 max-w-2xl mb-8">
                            {service.tagline}
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                            {service.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* BENEFITS */}
            <Reveal>
                <section className="py-28 px-6 lg:px-12 bg-dentalCream">
                    <div className="container mx-auto max-w-[1400px]">
                        <div className="grid lg:grid-cols-2 gap-20 items-start">
                            <div>
                                <span className="text-[10px] tracking-[0.4em] uppercase font-black text-gray-400 block mb-6">
                                    Clinical Advantages
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
                                    Why Clinics Choose <br />
                                    This Solution.
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-5 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-10 h-10 bg-dentalForest/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check size={18} className="text-teal-800" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-800">{benefit}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* MATERIALS */}
            <Reveal>
                <section className="py-28 px-6 lg:px-12">
                    <div className="container mx-auto max-w-[1400px]">
                        <span className="text-[10px] tracking-[0.4em] uppercase font-black text-gray-400 block mb-6">
                            Materials & Technology
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-16">
                            What We Work With.
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {service.materials.map((material, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100"
                                >
                                    <div className="mb-6 text-dentalGold">
                                        <Layers size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-dentalForest transition-colors">
                                        {material}
                                    </h3>
                                    {/* Decorative index */}
                                    <span className="absolute top-4 right-4 text-6xl font-black text-gray-100 pointer-events-none group-hover:text-gray-200/50 transition-colors">
                                        0{i + 1}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* WORKFLOW */}
            <Reveal>
                <section className="py-28 px-6 lg:px-12 bg-[#0a0a0a] text-white">
                    <div className="container mx-auto max-w-[1400px]">
                        <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/30 block mb-6">
                            Production Process
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-20">
                            Step-by-Step <br />
                            <span className="text-dentalGold">Workflow.</span>
                        </h2>

                        <div className="flex flex-col">
                            {service.workflow.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex items-center gap-8 lg:gap-16 py-8 lg:py-10 border-b border-white/10 hover:pl-6 transition-all duration-300"
                                >
                                    {/* Step Number */}
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/20 group-hover:text-dentalGold transition-colors w-20 flex-shrink-0">
                                        Step {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-dentalGold/50 group-hover:bg-dentalGold/10 transition-all flex-shrink-0">
                                        <Workflow size={18} className="text-white/40 group-hover:text-dentalGold transition-colors" />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-xl lg:text-3xl font-bold tracking-tight group-hover:text-dentalGold transition-colors">
                                        {step}
                                    </h3>

                                    {/* Arrow */}
                                    <div className="ml-auto hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={24} strokeWidth={1} className="text-dentalGold" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* CTA */}
            <Reveal>
                <section className="py-32 px-6 lg:px-12 text-center bg-dentalCream">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-12">
                            Submit your case or get in touch with our team to discuss
                            your {service.title.toLowerCase()} requirements.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-dentalForest text-white text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all flex items-center gap-2 group"
                            >
                                Submit a Case
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/downloads"
                                className="px-10 py-5 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                                Download Rx Forms
                            </Link>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* OTHER SERVICES */}
            <Reveal>
                <section className="py-28 px-6 lg:px-12 border-t border-gray-100">
                    <div className="container mx-auto max-w-[1400px]">
                        <span className="text-[10px] tracking-[0.4em] uppercase font-black text-gray-400 block mb-6">
                            Explore More
                        </span>
                        <h2 className="text-4xl font-black tracking-tight mb-14">
                            Other Services.
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {otherServices.map((s, i) => (
                                <Link
                                    key={i}
                                    href={`/services/${s.slug}`}
                                    className="group p-10 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100"
                                >
                                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-dentalGold mb-3 block">
                                        {s.category}
                                    </span>
                                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-dentalForest transition-colors mb-4">
                                        {s.title}
                                    </h3>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-dentalForest transition-colors flex items-center gap-2">
                                        Explore
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

            <Footer />
        </main>
    );
}
