"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, MeshDistortMaterial, Html, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Layers, Scan, Wand2, PlayCircle, Info } from "lucide-react";
import * as THREE from "three";

// 3D Model representing a generic dental restoration (Abstract Shape)
function RestorationModel({ mode }: { mode: "scan" | "design" | "final" }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.5}>
      <mesh ref={mesh} scale={2.5}>
        {/* Abstract Tooth Shape: Rounded Box + distortion */}
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />

        {/* MODE: SCAN (Wireframe / Holographic) */}
        {mode === "scan" && (
          <meshStandardMaterial
            color="#00ffff"
            wireframe
            emissive="#0044aa"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        )}

        {/* MODE: DESIGN (Clay / CAD Matte) */}
        {mode === "design" && (
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.9}
            metalness={0.1}
          />
        )}

        {/* MODE: FINAL (Polished Ceramic) */}
        {mode === "final" && (
          <MeshDistortMaterial
            color="#fdfdfd"
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0}
          />
        )}
      </mesh>
    </Float>
  );
}

const MODES = [
  { id: "scan", label: "01. Digital Impression", icon: Scan, desc: "3D Intraoral Scan Data" },
  { id: "design", label: "02. CAD Engineering", icon: Layers, desc: "Anatomical Contouring" },
  { id: "final", label: "03. Ceramic Finishing", icon: Wand2, desc: "Stain & Glaze" },
] as const;

export default function ServiceSimulator() {
  const [mode, setMode] = useState<"scan" | "design" | "final">("scan");

  return (
    <section id="demo" className="py-24 lg:py-40 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto max-w-[1500px] px-6 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.4em] uppercase font-black text-dentalGold mb-6 block">
              Interactive Learning
            </span>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8 leading-tight">
              See How It&apos;s Made.
            </h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
              Use this interactive demo to understand the digital workflow or explain the
              process potential to your patients. From scan to smile, visualize every step.
            </p>

            <div className="space-y-4">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-center gap-6 group ${mode === m.id
                    ? "bg-white/10 border-dentalGold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                    : "bg-transparent border-white/5 hover:bg-white/5"
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${mode === m.id ? "bg-dentalGold text-black" : "bg-white/5 text-white/40"
                    }`}>
                    <m.icon size={20} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${mode === m.id ? "text-white" : "text-white/40"
                      }`}>
                      {m.label}
                    </h4>
                    <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                      {m.desc}
                    </p>
                  </div>

                  {/* Play Indicator */}
                  {mode === m.id && (
                    <div className="ml-auto">
                      <PlayCircle size={24} className="text-dentalGold animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D CANVAS */}
          <div className="lg:col-span-7 h-[50vh] lg:h-[70vh] bg-gradient-to-b from-[#111] to-[#000] rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
            {/* UI Overlay */}
            <div className="absolute top-8 left-8 z-10 flex items-center gap-3 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                Live Demo Mode
              </span>
            </div>

            <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />

              <Environment preset={mode === 'final' ? "studio" : "city"} />

              <RestorationModel mode={mode} />

              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color={mode === 'scan' ? '#00ffff' : '#000000'} />
              <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={2} />
            </Canvas>

            {/* Educational Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-start gap-4 max-w-lg mx-auto bg-white/10 backdrop-blur p-4 rounded-xl border border-white/10">
                <Info size={20} className="text-dentalGold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-dentalGold mb-1">
                    Process Insight
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {mode === 'scan' && "The digital journey begins with a 15-micron accuracy scan, capturing every margin detail without physical impressions."}
                    {mode === 'design' && "AI-assisted CAD software generates the ideal anatomical form, accounting for occlusion and contact points."}
                    {mode === 'final' && "The restoration is milled, sintered, and hand-finished by master ceramists to mimic natural tooth translucency."}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}