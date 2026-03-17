"use client";

import React, { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";

/* ─── TOKENS (same as Awards page) ───────── */
const FOREST = "#162e1e";
const BRAND = "#A2D8B2";
const DEEP = "#2d6e47";

/* ─── REVEAL (same component) ─────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── PAGE ───────────────────────────────── */
export default function EthosPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <main
      className="bg-white min-h-screen text-slate-900 selection:bg-emerald-100 relative"
      style={{
        fontFamily: "var(--font-sans)",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
    >
      {/* subtle grain (same overlay) */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')",
        }}
      />

      <Navbar />

      {/* progress bar */}
      <motion.div
        style={{ scaleX: progress, background: BRAND }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[999]"
      />

      {/* ═════════ MAIN CONTENT ═════════ */}
      <div className="px-6 md:px-16 lg:px-24 pt-40 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* small heading */}
          <Reveal>
            <p
              className="text-[25px] font-black uppercase tracking-[0.40em] mb-8 text-center"
              style={{ color: DEEP }}
            >
              Ethos Statement
            </p>
          </Reveal>

          {/* paragraphs with staggered reveals */}
          <div className="space-y-8 text-slate-700 text-xl md:text-2xl leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                Ambridge Ceramics was built on a commitment to precision, integrity and consistently exceptional restorative outcomes. 
                Since our founding, we have combined advanced digital dentistry with traditional craftsmanship to deliver restorations that are clinically reliable, aesthetically natural and engineered for long‑term performance. 
                Every case is produced using only CE‑ and UKCA‑marked materials with full traceability, ensuring safety, compliance and complete confidence for both clinicians and patients.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                Our team of highly skilled, GDC‑registered technicians brings decades of collective experience across all our restorative options, ceramics, implants, digital workflows and prosthetics. 
                As a multi‑award‑winning laboratory, our technicians have contributed both individually and collaboratively to the creation of award‑winning restorations on a daily basis. This depth of expertise underpins our reputation for accuracy, communication and predictable results, supported by rigorous quality control at every stage of the workflow.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p>
                Driven by innovation and guided by clinical partnership, we continue to evolve with the latest in digital and CAD/CAM technologies, digitally based planning systems and advanced materials. 
                Our ethos is simple: to support clinicians with restorations that fit first time, look natural and perform reliably. All backed by transparent processes, technical excellence and a genuine dedication to patient outcomes.
              </p>
            </Reveal>
          </div>

          {/* optional subtle divider at bottom (if you want) */}
          <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-[#A2D8B2]/20 to-transparent"></div>
        </div>
      </div>

      <Footer />
    </main>
  );
}