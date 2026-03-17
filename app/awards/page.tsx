"use client";

import React, { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { CheckCircle2, ShieldCheck, Trophy, Cpu } from "lucide-react";

/* ─── TOKENS ─────────────────────────────── */
const FOREST = "#162e1e";
const BRAND = "#A2D8B2";
const DEEP = "#2d6e47";

/* ─── REVEAL ─────────────────────────────── */
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
export default function AwardsPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const [activeImage, setActiveImage] = React.useState<string | null>(null);

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
      {/* subtle grain */}
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

      {/* ═════════ HERO ═════════ */}
      <header
        className="relative px-6 md:px-16 lg:px-24 pt-40 pb-16 overflow-hidden" // reduced pb from 28 to 16
        style={{ background: "#f8faf9" }}
      >
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">

          {/* ───────── LEFT (TEXT) ───────── */}
          <div className="lg:col-span-5 z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[13px] md:text-[14px] font-extrabold uppercase tracking-[0.30em] mb-7"
              style={{ color: "#004d3d" }}
            >
              Awards & Accreditations
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[26px] md:text-[34px] lg:text-[38px] leading-[1.3] font-[360] tracking-tight text-slate-600"
            >
              <span className="font-semibold text-slate-900">
                Ambridge Ceramics
              </span>{" "}
              is recognised for its commitment to clinical excellence, precision manufacturing and the highest standards of quality assurance. Our laboratory operates under leading UK and international compliance frameworks, supported by advanced digital certifications and industry‑respected partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-x-8 gap-y-3 mt-14"
            >
              {["GDC Registered", "MHRA Compliant", "DAMAS Accredited"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "#5b6470" }}
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* ───────── RIGHT IMAGE ───────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full">
              <Image
                src="/2CB32A5C-5002-460F-8C5C-C98AE22E241D_1_105_c.jpeg"
                alt="Ambridge Ceramics Awards"
                width={1800}
                height={1200}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </header>

      {/* ═════════ CARDS ═════════ */}
      <section className="px-6 md:px-16 lg:px-24 pt-8 pb-28 bg-[#f8faf9]"> {/* reduced pt from 28 to 8 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 lg:gap-12">
          {[
            {
              icon: ShieldCheck,
              title: "Key Accreditations",
              items: [
                "MHRA Registered Dental Laboratory",
                "GDC Registered Technicians",
                "DAMAS Accredited Laboratory",
                "Fully compliant with UKCA/CE medical device regulations",
                "GDPR Compliant",
              ],
            },
            {
              icon: Cpu,
              title: "Digital & Manufacturing Certifications",
              items: [
                "Certified 3Shape and EXOCAD Digital Laboratory",
                "Approved partner for major intraoral scanner systems",
                "Accredited digital workflows across leading implant and restorative platforms",
              ],
            },
            {
              icon: Trophy,
              title: "Awards & Industry Recognition",
              items: [
                "Dental Laboratory Awards — Best Private Laboratory (Winner)",
                "Private Dentistry Awards — Restorative Smile",
                "Private Dentistry Awards — Best multiple Implant case",
                "Aesthetic Dentistry Awards — Technician Category",
              ],
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="group relative h-full p-10 lg:p-12 bg-white border border-[#e4eee7] rounded-[10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(22,46,30,0.16)]">

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-9">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ background: "#eef6f1" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: DEEP }} />
                    </div>

                    <h3
                      className="text-[15px] md:text-[17px] font-extrabold uppercase tracking-[0.22em] leading-tight"
                      style={{ color: DEEP }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* List */}
                  <ul className="space-y-5">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-4 items-start">
                        <CheckCircle2
                          className="w-[18px] h-[18px] mt-[3px] flex-shrink-0"
                          style={{ color: DEEP }}
                        />
                        <span className="text-[16.5px] md:text-[17.5px] text-slate-600 leading-[1.7]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═════════ GALLERY ═════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-10 text-center">
              <p
                className="text-[13px] font-black uppercase tracking-[0.40em]"
                style={{ color: DEEP }}
              >
                Awards Gallery
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "/02A2B29D-8458-4ACE-9704-2A17E4BBE46D_1_100_o.jpeg",
              "/F78A6BA1-7F9F-4E3F-8E56-29880AF7459E_1_102_o.jpeg",
              "/F6C9878D-C0EF-43E2-89AB-002BF3ECED50_1_102_o.jpeg",
            ].map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div
                  onClick={() => setActiveImage(src)}
                  className="group cursor-zoom-in relative bg-white border border-[#e4eee7] rounded-[8px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(22,46,30,0.12)]"
                >
                  <div className="relative w-full aspect-[4/5] flex items-center justify-center bg-white">
                    <Image
                      src={src}
                      alt={`Award ${i + 1}`}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ LIGHTBOX ═════════ */}
      {activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full">
            <Image
              src={activeImage}
              alt="Award enlarged"
              width={1600}
              height={1200}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
      )}

      <Footer />
    </main>
  );
}