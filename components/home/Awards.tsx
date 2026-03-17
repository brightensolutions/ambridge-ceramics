"use client";
import { motion } from "framer-motion";

export default function Awards() {
  const badges = [
    "DAMAS Registered",
    "MHRA Certified",
    "GDC Registered",
    "Digital Smile Design Partner",
    "ISO Compliant",
    "CE Approved Lab",
  ];

  return (
    <section className="relative bg-[#111] py-20 px-6 lg:px-12 overflow-hidden">
      {/* Edge fade gradients for premium feel */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#111] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#111] to-transparent z-10" />

      <div className="container mx-auto max-w-[1500px] space-y-12">

        {/* Label */}
        <div className="text-white/30 text-[10px] font-black tracking-[0.4em] uppercase text-center">
          Accreditations & Clinical Trust
        </div>

        {/* Moving badge strip */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex gap-10 w-max"
        >
          {[...badges, ...badges].map((badge, index) => (
            <div
              key={index}
              className="
                px-8 py-4
                border border-white/10
                rounded-sm
                text-white
                text-[11px]
                font-semibold
                tracking-widest
                uppercase
                bg-white/5
                backdrop-blur-sm
                hover:border-[#A2D8B2]/50
                hover:text-[#A2D8B2]
                hover:bg-white/10
                transition-all
                duration-500
                whitespace-nowrap
              "
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
