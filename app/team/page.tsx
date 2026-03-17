"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

/* ================= DATA ================= */

const team = [
  {
    name: "R. Mark Ambridge",
    role: "Founder, Managing Director & Clinical Dental Technician",
    photo: "/portrait-professional-medical-worker-posing-picture-with-arms-folded.jpg",
    desc: `Ambridge Ceramics began as a simple idea at Mark's workbench. With over two decades of hands-on experience, Mark has built the laboratory from the ground up — combining old-world craftsmanship with leading digital workflows.\n\nHis clinical insight drives every process at Ambridge Ceramics, from material selection to final delivery. Mark's work has been recognised at the highest national level, winning multiple industry awards across implant and restorative categories.`,
    stats: {
      experience: "25+ Years",
      specialisms: ["Implant Prosthetics", "Porcelain Layering", "Full Arch Rehabilitation"],
      registration: "GDC Registered CDT",
      awards: 3,
    },
    quote: "Every restoration tells the story of a patient's confidence restored.",
    accentColor: "#2d5a43",
  },
  {
    name: "Cameron Kelly",
    role: "Digital Designer & Implant Specialist Technician",
    photo: "/pexels-shkrabaanthony-6749773.jpg",
    desc: `Cameron is a highly skilled Digital Designer who leads Ambridge Ceramics' transition into fully digital workflows. His expertise spans 3Shape design, guided implant solutions, and complex full-arch cases.\n\nWith a precise eye for both aesthetics and occlusion, Cameron bridges the gap between digital planning and clinical outcome — ensuring every case is engineered to perform.`,
    stats: {
      experience: "10+ Years",
      specialisms: ["CAD/CAM Design", "3Shape Expert", "Guided Implantology"],
      registration: "GDC Registered",
      awards: 1,
    },
    quote: "Digital precision doesn't replace artistry — it amplifies it.",
    accentColor: "#3a7a5a",
  },
  {
    name: "Daisy Auckland",
    role: "Lab Manager & Workflow Coordinator",
    photo: "/doctor-with-his-arms-crossed-white-background.jpg",
    desc: `Daisy is the organisational centre of Ambridge Ceramics. She manages the day-to-day rhythm of the laboratory — from case intake and scheduling to quality assurance sign-off and clinician communication.\n\nHer background in dental nursing gives her a unique clinical perspective that shapes how the lab communicates with practices, ensuring every case arrives with complete, accurate information.`,
    stats: {
      experience: "8+ Years",
      specialisms: ["Quality Assurance", "Workflow Systems", "Clinician Liaison"],
      registration: "Former Dental Nurse",
      awards: 0,
    },
    quote: "A great restoration starts with great communication.",
    accentColor: "#4a8a6a",
  },
];

/* ================= HOVER BIO CARD ================= */

function HoverBioCard({ member, visible }: { member: typeof team[0]; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-0 top-full mt-4 z-50 w-[340px] pointer-events-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: member.accentColor }} />

            <div className="p-6">
              {/* Quote */}
              <p className="text-[13px] italic text-gray-500 mb-5 leading-relaxed border-l-2 pl-3"
                style={{ borderColor: member.accentColor }}>
                "{member.quote}"
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Experience</p>
                  <p className="text-base font-semibold text-[#1a242f]">{member.stats.experience}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Registration</p>
                  <p className="text-[13px] font-semibold text-[#1a242f]">{member.stats.registration}</p>
                </div>
              </div>

              {/* Specialisms */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Specialisms</p>
                <div className="flex flex-wrap gap-2">
                  {member.stats.specialisms.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: member.accentColor }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards if any */}
              {member.stats.awards > 0 && (
                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-100">
                  <div className="flex gap-1">
                    {Array.from({ length: member.stats.awards }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {member.stats.awards} Industry Award{member.stats.awards > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= MOBILE SWIPE STACK ================= */

function MobileSwipeView() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index < 0 || index >= team.length) return;
    setCurrent(index);
  };

  const handleDragEnd = useCallback((_: any, info: any) => {
    setDragging(false);
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(current + 1);
    else if (info.offset.x > threshold) goTo(current - 1);
  }, [current]);

  const member = team[current];

  return (
    <div className="lg:hidden flex flex-col min-h-screen bg-[#0e1612]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Full-screen photo area */}
      <div className="relative h-[60vh] overflow-hidden" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
          >
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
              priority
            />
            {/* Dark gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1612] via-[#0e1612]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Drag hint */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: dragging ? dragX : 0 }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: current === i ? "24px" : "6px",
                height: "6px",
                background: current === i ? member.accentColor : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Index counter */}
        <div className="absolute top-6 right-6 z-10">
          <span className="text-white/40 text-sm font-light tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div className="flex-1 px-7 pt-6 pb-32 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Name & Role */}
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">
              {member.name}
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-6"
              style={{ color: member.accentColor }}>
              {member.role}
            </p>

            {/* Quote */}
            <p className="text-sm italic text-white/50 mb-6 leading-relaxed border-l-2 pl-4"
              style={{ borderColor: member.accentColor }}>
              "{member.quote}"
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70">
                {member.stats.experience}
              </span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70">
                {member.stats.registration}
              </span>
              {member.stats.awards > 0 && (
                <span className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: member.accentColor }}>
                  ★ {member.stats.awards} Award{member.stats.awards > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Specialisms */}
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Specialisms</p>
              <div className="flex flex-wrap gap-2">
                {member.stats.specialisms.map((s, i) => (
                  <span key={i} className="text-[11px] font-semibold px-3 py-1 rounded-lg border text-white/60"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              {member.desc.split("\n\n").map((p, i) => (
                <p key={i} className="text-[15px] text-white/60 leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom swipe nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0e1612]/95 backdrop-blur-xl border-t border-white/10 py-4 px-6 flex items-center justify-between z-50">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-2 text-sm font-medium transition-opacity disabled:opacity-20 text-white/70"
        >
          <span>←</span> Prev
        </button>

        <div className="flex gap-3">
          {team.map((m, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all"
              style={{ borderColor: current === i ? member.accentColor : "transparent", opacity: current === i ? 1 : 0.4 }}>
              <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === team.length - 1}
          className="flex items-center gap-2 text-sm font-medium transition-opacity disabled:opacity-20 text-white/70"
        >
          Next <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ================= DESKTOP VIEW ================= */

function DesktopView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.15 }
    );
    document.querySelectorAll(".member-content-block").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const activeThumb = container.children[activeIndex] as HTMLElement;
    activeThumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  const scrollToMember = (index: number) => {
    const el = document.querySelector(`[data-index="${index}"]`);
    if (!el) return;
    window.scrollTo({ top: (el as HTMLElement).offsetTop - 140, behavior: "smooth" });
  };

  return (
    <main className="bg-[#f7f9fb] min-h-screen text-[#1a242f]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

     <motion.div
  style={{
    scaleX: progress,
    background: team[activeIndex].accentColor,
  }}
  className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[999]"
/>
      <div className="flex flex-col lg:flex-row">
        {/* LEFT */}
        <div className="lg:w-1/2 px-6 md:px-24 pt-44 pb-[90vh]">
          <div className="max-w-[65ch]">
            <div className="space-y-[55vh]">
              {team.map((member, i) => (
                <section
                  key={i}
                  data-index={i}
                  className="member-content-block"
                  style={{ opacity: activeIndex === i ? 1 : 0.3, transition: "opacity 0.5s" }}
                >
                  {/* Hoverable name with bio card */}
                  <div
                    className="relative inline-block mb-5"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <motion.h2
                      animate={{
                        opacity: activeIndex === i ? 1 : 0.6,
                        y: activeIndex === i ? 0 : 16,
                      }}
                      transition={{ duration: 0.45 }}
                      className="text-4xl md:text-6xl font-semibold tracking-tight cursor-default"
                    >
                      {member.name}
                    </motion.h2>
                    <HoverBioCard member={member} visible={hoveredIndex === i && activeIndex === i} />
                  </div>

                  <p className="text-sm font-bold uppercase tracking-[0.22em] mb-10 block"
                    style={{ color: member.accentColor }}>
                    {member.role}
                  </p>

                  <div className="space-y-6 text-[17px] text-gray-600 leading-relaxed">
                    {member.desc.split("\n\n").map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT STICKY */}
        <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={team[activeIndex].photo}
                alt={team[activeIndex].name}
                fill
                priority={activeIndex === 0}
                sizes="50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating stat card on right panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`stat-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-12 right-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-5 max-w-[200px]"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-3"
                style={{ color: team[activeIndex].accentColor }}>
                Experience
              </p>
              <p className="text-2xl font-semibold text-[#1a242f] mb-3 tracking-tight">
                {team[activeIndex].stats.experience}
              </p>
              <div className="flex flex-wrap gap-1">
                {team[activeIndex].stats.specialisms.slice(0, 2).map((s, i) => (
                  <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: team[activeIndex].accentColor }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-24 left-10 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-gray-300">
              Ambridge Ceramics
            </p>
          </div>
        </div>
      </div>

      {/* THUMB STRIP */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-gray-200 py-4">
        <div
          ref={scrollRef}
          className="flex gap-4 px-6 overflow-x-auto no-scrollbar max-w-6xl mx-auto items-center"
        >
          {team.map((m, i) => (
            <button
              key={i}
              onClick={() => scrollToMember(i)}
              className="relative flex-shrink-0 group"
            >
              <div className={`w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                activeIndex === i ? "scale-110" : "opacity-40 hover:opacity-80 scale-100"
              }`}
                style={{ borderColor: activeIndex === i ? m.accentColor : "transparent" }}>
                <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
              </div>
              {activeIndex === i && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
                  style={{ color: m.accentColor }}
                >
                  {m.name.split(" ")[0]}
                </motion.p>
              )}
            </button>
          ))}
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
      `}</style>
    </main>
  );
}

/* ================= ROOT EXPORT ================= */

export default function TeamPage() {
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileSwipeView />
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  );
}