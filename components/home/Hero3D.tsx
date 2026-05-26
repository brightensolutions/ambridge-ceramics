"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

function HeroModel() {
    const [scale, setScale] = useState(0.9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setScale(0.9); // Decreased from 1.2 to make it smaller on mobile
            } else if (window.innerWidth < 1024) {
                setScale(0.85); // Slightly smaller tablet view
            } else {
                setScale(0.8); // Cleaner desktop presentation scale
            }
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Float rotationIntensity={0.6} floatIntensity={0.6} speed={2.2}>
            <group rotation={[0.2, -0.5, 0]} scale={scale}>
                {/* Abstract Dental Shape - A stylised molar or implant structure */}
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <torusKnotGeometry args={[1.2, 0.4, 200, 32, 2, 3]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.15}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        transmission={0.05}
                    />
                </mesh>

                {/* Accents */}
                <mesh position={[1.5, 1.5, -1]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#A68966" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[-1.5, -1, 1]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#A2D8B2" metalness={0.6} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <section className="relative w-full bg-white pt-[140px] sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
            <div className="container mx-auto max-w-[1500px]">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: CONTENT ACCENT LAYERS */}
                    <div className="w-full flex flex-col justify-center z-10 max-w-3xl order-1">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] sm:text-xs font-bold tracking-widest uppercase text-gray-400 mb-5 sm:mb-8">
                                <span>Premium Dental Restorations</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300 hidden xs:inline-block"></span>
                                <span>Digital Workflows</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block"></span>
                                <span>Fully Traceable Quality</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 tracking-tight uppercase">
                                Tailored Solutions <br />
                                For Digital and Analogue <br />
                                Workflows
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-14 w-full max-w-sm sm:max-w-none">
                                <Link
                                    href="/send-case"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A3626] text-white px-8 py-4 rounded-md font-bold text-sm hover:bg-opacity-90 transition-all group shadow-sm"
                                >
                                    Send a Case
                                    <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                
                                <Link
                                    href="/services"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-md font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all group"
                                >
                                    View Services
                                    <ArrowUpRight size={18} className="text-gray-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </Reveal>

                        {/* Trusted By Brand Row */}
                        <Reveal delay={0.3}>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-400">Trusted by</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-800 text-xs sm:text-sm">3Shape</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-800 text-xs sm:text-sm">Exocad</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-800 text-xs sm:text-sm">Itero</span>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT COLUMN: MODIFIED CONTAINER FOR 3D CANVAS & SCROLL TRACK */}
                    <div className="w-full h-[50vh] sm:h-[55vh] lg:h-[75vh] relative order-2 mt-6 lg:mt-0">
                        {/* Soft background container shape */}
                        <div className="absolute inset-0 bg-gray-50/40 rounded-3xl -z-10" />
                        
                        {/* Split grid: 75% interactive WebGL Canvas, 25% safe scroll track on the right */}
                        <div className="w-full h-full grid grid-cols-4 relative">
                            
                            {/* 3D Model Viewport (Takes up the left 3 columns) */}
                            <div className="col-span-3 h-full relative touch-pan-y">
                                <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true }}>
                                    <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />
                                    <ambientLight intensity={0.75} />
                                    <spotLight
                                        position={[10, 10, 10]}
                                        angle={0.15}
                                        penumbra={1}
                                        intensity={1.2}
                                        castShadow
                                    />
                                    <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00A79D" />

                                    <Suspense fallback={null}>
                                        <Environment preset="city" />
                                        <HeroModel />
                                        <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={14} blur={2.2} far={4.5} />
                                    </Suspense>

                                    <OrbitControls
                                        enableZoom={false}
                                        autoRotate
                                        autoRotateSpeed={0.9}
                                        maxPolarAngle={Math.PI / 1.5}
                                        minPolarAngle={Math.PI / 3}
                                    />
                                </Canvas>
                            </div>

                            {/* INVISIBLE SCROLL ZONE (Takes up the far right 25% column) */}
                            <div className="col-span-1 h-full w-full bg-transparent z-20 select-none cursor-ns-resize" />

                            {/* Floating Interactable Live Render Card */}
                            <motion.div
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute bottom-4 left-4 bg-white/80 backdrop-blur border border-gray-100 p-4 rounded-xl shadow-sm max-w-[200px] sm:max-w-xs hidden sm:block pointer-events-none select-none"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Live 3D Preview</span>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed">
                                    Interact directly with our digital restorations on the left, or swipe down on the right edge to scroll.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}