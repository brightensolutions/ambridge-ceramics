"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <section className="relative w-full min-h-[90vh] bg-dentalCream flex items-center overflow-hidden pt-24">

            {/* BACKGROUND DECORATION */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-white via-dentalCream to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto max-w-[1500px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 h-full">

                {/* TEXT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-12 bg-dentalGold" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-dentalGold">
                            State of the Art Laboratory
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-gray-900 mb-8 tracking-tight">
                        Precision <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-dentalForest to-ambridgeTeal">
                            Meets Artistry.
                        </span>
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
                        Experience the future of dental restoration. We combine advanced
                        3D rendering, CAD/CAM technology, and master craftsmanship
                        to deliver unmatched quality.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/viewer"
                            className="px-8 py-4 bg-dentalForest text-black text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all flex items-center gap-2 group"
                        >
                            Launch 3D Viewer
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/contact"
                            className="px-8 py-4 border border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
                        >
                            Partner With Us
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple placeholders for trusted brands/logos */}
                        <span className="text-xs font-bold tracking-widest uppercase">Trusted by</span>
                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                        <span className="font-serif italic">3Shape</span>
                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                        <span className="font-serif italic">Exocad</span>
                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                        <span className="font-serif italic">Itero</span>
                    </div>
                </motion.div>

                {/* 3D CANVAS */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-[50vh] lg:h-[80vh] w-full relative"
                >
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

                    {/* Floating UI Card for 'Tech Specs' */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute bottom-10 right-10 bg-white/80 backdrop-blur border border-white/40 p-5 rounded-2xl shadow-elevated max-w-xs hidden md:block"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Render</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Interact with our digital models directly in the browser. Zoom, rotate, and inspect material quality.
                        </p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
