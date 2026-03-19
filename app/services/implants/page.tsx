"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ImplantsPage() {
    return (
        <main className="bg-[#f8fbf9] min-h-screen relative overflow-hidden font-sans">
            {/* AMBIENT BACKGROUND EFFECTS */}
            <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#a2d8b2] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse" style={{ animationDuration: '5s' }}></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[#a2d8b2] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>

            <Navbar />

            <section className="pt-36 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto relative z-10">
                
                {/* Back Button */}
                <div className="animate-fadeIn">
                    <Link
                        href="/services"
                        className="group inline-flex items-center text-gray-500 mb-8 hover:text-[#7ab88a] transition-all duration-300 font-medium bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-100 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>
                </div>

                {/* Page Header */}
                <div className="text-center mb-24 relative animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 uppercase">
                        Implants
                    </h1>
                   
                </div>

                {/* --- SCREW RETAINED SECTION --- */}
                <div className="mb-28 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <div className="mb-12 relative">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-4">
                            Screw Retained
                            <span className="h-px flex-grow bg-gradient-to-r from-[#a2d8b2] to-transparent ml-4 opacity-50"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group cursor-pointer flex flex-col items-center">
                                {/* Premium Glass Card Wrapper */}
                                <div className="w-full aspect-square bg-white rounded-[2rem] p-3 mb-6 relative shadow-sm border border-gray-100 group-hover:border-[#a2d8b2]/60 group-hover:shadow-[0_20px_40px_-15px_rgba(162,216,178,0.5)] transition-all duration-500 transform group-hover:-translate-y-2">
                                    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-50">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            unoptimized
                                        />
                                        {/* Subtle overlay on hover */}
                                        <div className="absolute inset-0 bg-[#a2d8b2]/0 group-hover:bg-[#a2d8b2]/10 transition-colors duration-500"></div>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5a966d] transition-colors duration-300 px-2 text-center">
                                    {product.name}
                                </h3>
                                
                                {/* Animated underline effect */}
                                <div className="h-0.5 w-0 bg-[#a2d8b2] mt-3 transition-all duration-500 group-hover:w-12 rounded-full"></div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- CEMENT RETAINED SECTION --- */}
                <div className="mb-20 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                    <div className="mb-12 relative">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-4">
                            Cement Retained
                            <span className="h-px flex-grow bg-gradient-to-r from-[#a2d8b2] to-transparent ml-4 opacity-50"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group cursor-pointer flex flex-col items-center">
                                <div className="w-full aspect-square bg-white rounded-[2rem] p-3 mb-6 relative shadow-sm border border-gray-100 group-hover:border-[#a2d8b2]/60 group-hover:shadow-[0_20px_40px_-15px_rgba(162,216,178,0.5)] transition-all duration-500 transform group-hover:-translate-y-2">
                                    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-50">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-[#a2d8b2]/0 group-hover:bg-[#a2d8b2]/10 transition-colors duration-500"></div>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5a966d] transition-colors duration-300 px-2 text-center">
                                    {product.name}
                                </h3>
                                
                                <div className="h-0.5 w-0 bg-[#a2d8b2] mt-3 transition-all duration-500 group-hover:w-12 rounded-full"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slideUp {
                    animation: slideUp 0.6s ease-out forwards;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </main>
    );
}
