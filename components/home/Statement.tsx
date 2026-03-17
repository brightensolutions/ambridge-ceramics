"use client";

import { motion } from "framer-motion";
import { Layers, Zap, ShieldCheck, Microscope } from "lucide-react";

const MATERIALS = [
  {
    name: "Full Gold Crown",
    desc: "The gold standard for longevity and biocompatibility.",
    gradient: "from-yellow-300 to-yellow-600",
    icon: ShieldCheck
  },
  {
    name: "Zirconia (Monolithic)",
    desc: "High-strength aesthetics for posterior functionality.",
    gradient: "from-gray-100 to-gray-300",
    icon: Layers
  },
  {
    name: "E.max Layered",
    desc: "Unrivaled optical properties for anterior perfection.",
    gradient: "from-blue-100 to-purple-100",
    icon: SparkleIcon // defined below
  }
];

function SparkleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}

export default function DigitalTwinSection() {
  return (
    <section className="py-24 lg:py-40 bg-dentalCream relative overflow-hidden">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

      <div className="container mx-auto max-w-[1500px] px-6 lg:px-12 relative z-10">

        {/* HEADER: Focus on Education/Demonstration */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-dentalForest/10 rounded-full border border-dentalForest/20"
            >
              <Microscope size={14} className="text-teal-800" />
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-dentalForest">
                Clinical Education
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black text-black tracking-tighter leading-[0.9] mb-8"
            >
              Visualize the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dentalForest to-teal-600">
                Craftsmanship.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl text-gray-500 leading-relaxed max-w-lg"
            >
              Understand the &quot;How&quot; and &quot;Why&quot; behind every restoration.
              Use our interactive material showcase to demonstrate value to your patients
              or train your clinical team.
            </motion.p>
          </div>

          {/* VISUAL: Material Showcase Cards */}
          <div className="relative">
            {MATERIALS.map((mat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className={`
                  relative z-${30 - i * 10} 
                  bg-white rounded-2xl p-8 border border-gray-100 shadow-xl mb-6 last:mb-0 
                  transform transition-transform hover:-translate-x-4
                  ${i > 0 ? "-mt-16 ml-12 lg:ml-24" : ""}
                `}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${mat.gradient}`} />
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                        Material Class {i + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-black">{mat.name}</h3>
                  </div>
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-black/50">
                    <mat.icon size={20} />
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {mat.desc}
                </p>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-dentalGold group cursor-pointer">
                  See Process
                  <Zap size={14} className="fill-current" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}