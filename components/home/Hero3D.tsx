"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

function HeroModel() {
    return (
        <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
            <group rotation={[0.2, -0.5, 0]}>
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
        <section className="relative w-full bg-white pt-16 lg:pt-24 px-6 lg:px-12 overflow-hidden">
            <div className="container mx-auto max-w-[1500px]">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: CONTENT (Matches Layout & Styling from Image) */}
                    <div className="w-full flex flex-col justify-center z-10 max-w-3xl pb-12 lg:pb-0">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
                                <span>Premium Dental Restorations</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span>Digital Workflows</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span>Fully Traceable Quality</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-10 tracking-tight">
                                TAILORED SOLUTIONS <br />
                                FOR DIGITAL AND ANALOGUE <br />
                                WORKFLOWS
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                                <Link
                                    href="/send-case"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A3626] text-white px-8 py-3.5 rounded-md font-bold text-sm hover:bg-opacity-90 transition-all group"
                                >
                                    Send a Case
                                    <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                
                                <Link
                                    href="/services"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-md font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all group"
                                >
                                    View Services
                                    <ArrowUpRight size={18} className="text-gray-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </Reveal>

                        {/* Trusted By Sub-section */}
                        <Reveal delay={0.3}>
                            <div className="flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Trusted by</span>
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-750 text-sm">3Shape</span>
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-750 text-sm">Exocad</span>
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                                <span className="font-serif italic text-gray-750 text-sm">Itero</span>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT COLUMN: 3D CANVAS */}
                    <div className="w-full lg:h-[75vh] h-[50vh] relative flex items-center justify-center">
                        {/* Soft subtle container backing matching your architectural palette */}
                        <div className="absolute inset-0 bg-gray-50/50 rounded-t-3xl -z-10" />
                        
                        <div className="w-full h-full relative">
                            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                                <ambientLight intensity={0.7} />
                                <spotLight
                                    position={[10, 10, 10]}
                                    angle={0.15}
                                    penumbra={1}
                                    intensity={1}
                                    castShadow
                                />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00A79D" />

                                <Suspense fallback={null}>
                                    <Environment preset="city" />
                                    <HeroModel />
                                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                                </Suspense>

                                <OrbitControls
                                    enableZoom={false}
                                    autoRotate
                                    autoRotateSpeed={1}
                                    maxPolarAngle={Math.PI / 1.5}
                                    minPolarAngle={Math.PI / 3}
                                />
                            </Canvas>

                            {/* Floating Interactable Live Render Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute bottom-6 right-6 bg-white/80 backdrop-blur border border-gray-100 p-5 rounded-xl shadow-sm max-w-xs hidden md:block"
                            >
                                <div className="flex items-center gap-3 mb-1.5">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live 3D Preview</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Interact directly with our digital restorations. Drag to rotate and examine spatial geometry.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}