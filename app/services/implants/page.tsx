"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ArrowLeft } from "lucide-react";

export default function ImplantsPage() {
    return (
        <main className="bg-white min-h-screen font-sans">
            <Navbar />

            <section className="pt-40 pb-8 px-10">
                <div className="max-w-7xl mx-auto">
                    {/* Back button - above heading */}
                    <div className="mb-6">
                        <Link
                            href="/services"
                            className="inline-flex items-center text-gray-500 hover:text-[#7ab88a] transition-colors font-medium border-b border-gray-200 pb-1 group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to Services
                        </Link>
                    </div>

                    {/* Hero heading with brand green tint */}
                    <div className="relative">
                        {/* Subtle brand green background tint */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#a2d8b2] opacity-20 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#a2d8b2] opacity-10 blur-3xl rounded-full"></div>
                        
                        <h1 className="text-6xl font-black uppercase tracking-tight text-[#2d6a4f] relative z-10">
                            Implants
                        </h1>
                        <p className="mt-6 text-gray-600 max-w-2xl relative z-10">
                            Precision implant solutions for predictable clinical outcomes. CAD/CAM custom abutments and full‑arch restorations.
                        </p>
                    </div>
                </div>
            </section>

            {/* SCREW RETAINED SECTION */}
            <section className="py-12 px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 pb-2 border-b border-[#a2d8b2] inline-block">
                        Screw Retained
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group">
                                <div className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#a2d8b2]/50">
                                    <div className="h-52 bg-gray-100 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={600}
                                            height={300}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold uppercase tracking-tight text-[#2d6a4f] group-hover:text-[#7ab88a] transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEMENT RETAINED SECTION */}
            <section className="py-12 px-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 pb-2 border-b border-[#a2d8b2] inline-block">
                        Cement Retained
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group">
                                <div className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#a2d8b2]/50">
                                    <div className="h-52 bg-gray-100 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={600}
                                            height={300}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold uppercase tracking-tight text-[#2d6a4f] group-hover:text-[#7ab88a] transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}