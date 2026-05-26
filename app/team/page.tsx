"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";

/* ================= DATA ================= */

const team = [
  {
    name: "R. Mark Ambridge",
    file: "R-Mark-Ambridge.png",
    role: "Founder, Managing Director & Clinical Dental Technician",
    desc: `Ambridge Ceramics began as a simple idea at Mark's workbench: that a dental laboratory could be both clinically exceptional and genuinely human. Mark started his career as a hands‑on technician, learning the craft the traditional way through patience, repetition, and a deep respect for the clinicians and patients who rely on every restoration. Over the years, that dedication grew into a vision for something bigger: a laboratory built on integrity, precision, and a relentless commitment to doing things properly.\n\nFounding Ambridge Ceramics wasn’t just a business decision; it was a personal mission. Mark wanted to create a place where skilled technicians could thrive, where innovation had purpose, and where every case — no matter how routine or complex — received the same level of care. Now as a Clinical Dental Technician, he brings a unique perspective that bridges the gap between laboratory and clinic, ensuring that every restoration is designed with real‑world function and patient comfort in mind.\n\nWhile Mark leads the direction of the lab, he is the first to say that Ambridge Ceramics is defined by the people who stand beside him. The team he has built over the years is a group of talented, dedicated professionals who share his values and take pride in their craft. Their collective expertise — from ceramics and digital design to implants and smile makeovers — are what allows the lab to deliver the consistency, reliability, and quality it is known for today.\n\nFor Mark, success isn’t measured in output, but in trust: the trust of clinicians, the confidence of patients, and the pride of a team that believes in the work they do. That belief continues to shape Ambridge Ceramics, guiding its growth, its innovation, and its commitment to excellence.`,
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
    file: "Cameron-Kelly.png",
    role: "Digital Designer & Implant Specialist Technician",
    desc: `Cameron is a highly skilled Digital Designer and Implant Specialist Technician whose work bridges advanced CAD workflows with the technical demands of implant‑based restorative dentistry. With strong expertise in digital design, implant planning, and precision‑engineered restorative solutions, he plays a key role in delivering accurate, predictable outcomes across a wide range of clinical cases.\n\nWorking confidently across multiple implant systems, Cameron specialises in the design and fabrication of custom abutments, screw‑retained restorations, and multi‑unit frameworks. His ability to interpret intraoral scans, optimise digital models, and engineer restorations for long‑term stability makes him a trusted contributor to the lab’s implant department.\n\nCameron’s approach is methodical, detail‑driven, and grounded in a deep understanding of both digital and traditional restorative principles. His work supports the lab’s commitment to technical excellence, innovation, and consistent quality, making him an integral part of the team behind Ambridge Ceramics’ growing digital and implant capabilities.`,
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
    file: "Daisy-Auckland.png",
    role: "Lab Manager & Workflow Coordinator",
    desc: `Daisy is the organisational centre of Ambridge Ceramics, overseeing the smooth running of daily operations and ensuring every case moves through the lab with accuracy, clarity, and efficiency. As Lab Manager and Workflow Coordinator, she plays a vital role in connecting departments, supporting technicians, and maintaining the structured processes that underpin the lab’s high standards.\n\nWith a calm, methodical approach and a strong eye for detail, Daisy manages scheduling, case flow, communication, and quality checkpoints, ensuring clinicians receive consistent, reliable service. Her ability to balance operational demands with the needs of both the team and the practices they support makes her an invaluable part of the lab’s leadership structure.\n\nDaisy’s work ensures that the technical expertise of the team is matched by equally strong organisation and communication — helping Ambridge Ceramics deliver the dependable, professional service it is known for.`,
    stats: {
      experience: "8+ Years",
      specialisms: ["Quality Assurance", "Workflow Systems", "Clinician Liaison"],
      registration: "Former Dental Nurse",
      awards: 0,
    },
    quote: "A great restoration starts with great communication.",
    accentColor: "#4a8a6a",
  },
  {
    name: "Iulia Vlas",
    file: "Iulia-Vlas.png",
    role: "Experienced Ceramist & Chief Digital Designer",
    desc: `Iulia is a highly accomplished ceramist and the driving force behind Ambridge Ceramics’ digital design department. With extensive experience across both traditional ceramic craftsmanship and advanced CAD/CAM workflows, she brings a rare combination of artistic finesse and technical precision to every case she handles.\n\nAs Chief Digital Designer, Iulia leads the development of the lab’s digital workflows, overseeing complex design work ranging from aesthetic crowns and veneers to implant‑supported restorations and multi‑unit frameworks. Her ability to interpret clinical data, refine digital models, and engineer restorations for accuracy and long‑term performance makes her a trusted authority within the team.\n\nIulia’s ceramic work is defined by natural morphology, refined shade characterisation, and a deep understanding of colour and translucency — skills that allow her to create restorations that blend seamlessly into the patient’s smile. Her leadership in both ceramics and digital design ensures that the lab’s aesthetic standards and technical consistency remain exceptionally high.\n\nCalm, meticulous, and highly collaborative, Iulia plays a central role in shaping the quality and innovation that define Ambridge Ceramics.`,
    stats: {
      experience: "12+ Years",
      specialisms: ["Multi‑Layer Ceramics", "Stain & Glaze", "Digital Workflow"],
      registration: "GDC Registered",
      awards: 2,
    },
    quote: "A tooth should look alive – not just like a copy.",
    accentColor: "#5f8b6f",
  },
  {
    name: "Jamie Pickersgill",
    file: "Jamie-Pickersgill.png",
    role: "Implant Technician in Training & Prosthetics Understudy",
    desc: `Jamie is developing his skills within the implant and prosthetics department under the direct mentorship of Lee Nichols. As Lee’s understudy, he is gaining hands‑on experience across implant workflows, prosthetic design, and the technical foundations required for high‑precision restorative work.\n\nWith a strong work ethic and a methodical approach, Jamie is steadily building his expertise in areas such as custom abutments, screw‑retained solutions, and implant‑supported prosthetics. His growing understanding of both digital and traditional processes makes him a valuable and reliable support within the team.\n\nJamie’s commitment to learning, combined with the guidance of one of the lab’s most experienced specialists, positions him as an important part of the next generation of implant technicians at Ambridge Ceramics.`,
    stats: {
      experience: "3+ Years",
      specialisms: ["Implant Understudy", "Prosthetics", "Digital Planning"],
      registration: "In Training",
      awards: 0,
    },
    quote: "Every day is a chance to learn from the best.",
    accentColor: "#3d6e55",
  },
  {
    name: "Laurie Boyle",
    file: "Laurie-Boyle.png",
    role: "Model & Prep Technician / 3D Surgical Guide Trainee",
    desc: `Laurie is a reliable and detail‑driven Model & Prep Technician who plays an essential role in establishing the accuracy and foundation of every case that enters the lab. His work ensures that each restoration begins with precise models, correct articulation, and consistent preparation — the groundwork that supports predictable, high‑quality outcomes across all departments.\n\nAlongside his core responsibilities, Laurie is now expanding his expertise into the design and production of 3D surgical guides. Under the guidance of the digital and implant teams, he is developing skills in digital planning, guide design, and the technical workflows that support implant placement accuracy. His methodical approach, steady progression, and strong understanding of foundational lab processes make him well‑suited to this advanced area of digital dentistry.\n\nLaurie’s commitment to learning and his growing role in 3D surgical guide production reflect the lab’s ongoing investment in innovation and future‑focused digital capability.`,
    stats: {
      experience: "6+ Years",
      specialisms: ["Model Work", "Surgical Guides", "3D Printing"],
      registration: "GDC Registered",
      awards: 0,
    },
    quote: "Accuracy begins at the bench – get that right, everything follows.",
    accentColor: "#2f6b4a",
  },
  {
    name: "Lee Nichols",
    file: "Lee-Nichols.png",
    role: "Implant Specialist Technician & Prosthetics Lead",
    desc: `With more than 30 years of experience in implant and prosthetic dentistry, Lee is one of the most seasoned and respected technicians in the UK and within Ambridge Ceramics. His career spans decades of technological change, yet his commitment to precision, reliability, and clinical excellence has remained constant throughout. As Prosthetics Lead and senior Implant Specialist Technician, Lee oversees some of the lab’s most complex restorative cases, ensuring every solution is engineered for long‑term stability and predictable clinical outcomes.\n\nLee’s depth of knowledge across implant systems, custom abutment design, screw‑retained frameworks, and full‑arch prosthetics makes him a trusted authority for both colleagues and clinicians. His leadership shapes the standards of the implant and prosthetics department, guiding workflows, mentoring technicians, and ensuring that every case meets the exacting quality the lab is known for.\n\nCalm, methodical, and uncompromising in his attention to detail, Lee plays a central role in maintaining the technical integrity of the lab’s implant work. His decades of experience, combined with his steady leadership, form a vital part of the foundation on which Ambridge Ceramics continues to grow.`,
    stats: {
      experience: "30+ Years",
      specialisms: ["Full‑Arch Implants", "Custom Abutments", "Prosthetics Lead"],
      registration: "GDC Registered",
      awards: 2,
    },
    quote: "Excellence in implantology is never rushed – it’s engineered.",
    accentColor: "#417155",
  },
  {
    name: "Louise Duncanson",
    file: "Louise-Duncanson.png",
    role: "Ceramist",
    desc: `Louise is a skilled ceramist whose work reflects a strong blend of technical precision and artistic sensitivity. She specialises in producing high‑quality ceramic restorations with natural morphology, accurate shade matching, and a consistent attention to detail that supports predictable clinical outcomes. Her calm, methodical approach and steady craftsmanship make her a trusted member of the ceramics team, contributing to both everyday restorative work and more demanding aesthetic cases.\n\nLouise’s commitment to quality and her ability to deliver reliable, beautifully finished restorations play an important role in maintaining the high standards that define Ambridge Ceramics. Her work embodies the lab’s ethos of care, consistency, and pride in every case.`,
    stats: {
      experience: "14+ Years",
      specialisms: ["Ceramic Layering", "Shade Matching", "Aesthetic Restorations"],
      registration: "GDC Registered",
      awards: 0,
    },
    quote: "Beauty and strength are not opposites – they belong together.",
    accentColor: "#6f9a7c",
  },
  {
    name: "Marc Tocher",
    file: "Marc-Tocher.png",
    role: "Senior Ceramist & Implant Restorations Specialist",
    desc: `With more than 20 years of experience in advanced ceramics and implant‑borne restorations, Marc is one of the most accomplished and respected technicians within Ambridge Ceramics. His career has been defined by an unwavering commitment to precision, aesthetics, and technical excellence — qualities that have made him a trusted specialist for complex cosmetic and implant cases.\n\nMarc’s expertise spans high‑end ceramic layering, natural characterisation, and the creation of restorations that balance beauty with long‑term functional performance. His deep understanding of implant prosthetics allows him to work confidently across a wide range of systems, producing crowns, bridges, and multi‑unit solutions engineered for accuracy and clinical predictability.\n\nAs a senior member of the technical team, Marc plays a key role in maintaining the lab’s aesthetic and technical standards. His calm, meticulous approach and decades of hands‑on experience make him a valued mentor within the ceramics department and a reliable partner for clinicians seeking consistently exceptional results.\n\nMarc’s craftsmanship is a cornerstone of the quality Ambridge Ceramics is known for — a blend of artistry, technical mastery, and the kind of experience that only comes from a lifetime dedicated to the craft.`,
    stats: {
      experience: "20+ Years",
      specialisms: ["High‑End Ceramics", "Implant Restorations", "Mentorship"],
      registration: "GDC Registered",
      awards: 2,
    },
    quote: "Every restoration is a signature of care and skill.",
    accentColor: "#438b62",
  },
  {
    name: "Mathew Graham",
    file: "Mathew-Graham.png",
    role: "Senior Ceramist & Implant Restorations Specialist",
    desc: `With over 15 years of experience, Mathew brings a rare blend of artistic craftsmanship and technical implant expertise to Ambridge Ceramics. As a senior member of the team, he specialises in high‑end ceramic and composite restorations, creating crowns and veneers with natural morphology, lifelike translucency, and subtle characterisation that reflect a deep understanding of colour, texture, and light behaviour.\n\nAlongside his aesthetic work, Mathew is highly skilled in implant‑based restorative design. He works confidently across a wide range of implant systems, producing crowns, bridges, and multi‑unit solutions engineered for accuracy, stability, and predictable long‑term performance. His ability to combine aesthetic finesse with the functional demands of implant prosthetics makes him a trusted specialist for complex restorative cases.\n\nMathew’s calm, methodical approach and strong technical judgement make him a valued collaborator for clinicians and a steady mentor within the ceramics department. His blend of artistry, precision, and real‑world implant experience contributes significantly to the quality and consistency that define Ambridge Ceramics.`,
    stats: {
      experience: "15+ Years",
      specialisms: ["Ceramic & Composite", "Implant Crowns", "Aesthetics"],
      registration: "GDC Registered",
      awards: 1,
    },
    quote: "Artistry without engineering is incomplete – both matter equally.",
    accentColor: "#2c7752",
  },
  {
    name: "Oliver Ambridge",
    file: "Oliver-Ambridge.png",
    role: "Digital Design Lead & Emerging Technical Strategist",
    desc: `Oliver represents the future direction of Ambridge Ceramics – a new generation of technician who combines advanced digital expertise with a growing strategic role in the lab’s development. Having grown up around the craft, he brings both a deep respect for traditional dental technology and a forward‑looking mindset that embraces the possibilities of modern CAD/CAM workflows.\n\nAs Digital Design Lead, Oliver plays a central role in shaping the lab’s digital infrastructure. He specialises in advanced CAD design, implant planning, and the creation of high‑precision restorative solutions, including custom abutments, screw‑retained frameworks, and complex multi‑unit cases. His ability to interpret clinical data, optimise digital models, and engineer restorations for predictable long‑term performance has made him a trusted point of reference within the team.\n\nOliver’s influence extends beyond day‑to‑day design work. He collaborates closely with the team on workflow development, digital innovation, and the integration of new technologies – including the lab’s next‑generation 3D restoration configurator. His methodical approach, technical insight, and calm problem‑solving style have positioned him as a natural leader within the digital department.\n\nWhat sets Oliver apart is not just his technical capability, but his commitment to continuous improvement and his instinct for future‑proofing the lab’s processes. He is part of the dedicated team driving Ambridge Ceramics forward, helping to ensure that the lab remains at the forefront of digital dentistry while staying true to the values that define its reputation.`,
    stats: {
      experience: "7+ Years",
      specialisms: ["CAD Design", "Implant Planning", "Digital Strategy"],
      registration: "GDC Registered",
      awards: 0,
    },
    quote: "Innovation is only valuable if it makes your day easier.",
    accentColor: "#3f8262",
  },
  {
    name: "Jenna Chambers",
    file: "Jenna-Chambers.png",
    role: "Head of Bleaching Tray Department",
    desc: `Jenna leads the bleaching tray department with a level of precision and consistency that has become a hallmark of Ambridge Ceramics. She oversees every stage of the process — from model assessment to final fit — ensuring each tray delivers predictable, comfortable, and effective whitening results for patients.\n\nWith a meticulous eye for detail and a calm, methodical approach, Jenna has refined the department’s workflows to achieve exceptional accuracy and turnaround times. Her expertise in material handling, adaptation techniques, and quality control ensures that clinicians receive trays they can trust for both single‑arch and full‑arch whitening cases.\n\nJenna’s commitment to craftsmanship and reliability makes her an integral part of the restorative journey, supporting clinicians in delivering confident, high‑quality cosmetic outcomes.`,
    stats: {
      experience: "7+ Years",
      specialisms: ["Bleaching Trays", "Quality Control", "Patient Comfort"],
      registration: "GDC Registered",
      awards: 0,
    },
    quote: "Small details, big confidence – for the patient and the clinician.",
    accentColor: "#558b6e",
  },
  {
    name: "Molly Lambley",
    file: "Molly-Lambley.png",
    role: "AC Aligner Department Lead & Bleaching Tray Technician",
    desc: `Molly is a valued member of the bleaching tray department, known for her steady approach, attention to detail, and commitment to producing trays that fit comfortably and perform consistently. She takes pride in the small refinements that make a big difference to patient comfort and whitening results.\n\nAs demand for AC Aligners continues to rise, Molly is preparing to step into a new leadership role within the department. She is already building her knowledge of aligner workflows and digital processes, bringing the same care and reliability that define her current work.\n\nMolly’s enthusiasm for learning and her natural sense of organisation make her an exciting part of the lab’s future as the aligner service expands.`,
    stats: {
      experience: "4+ Years",
      specialisms: ["Bleaching Trays", "AC Aligners", "Digital Workflow"],
      registration: "GDC Registered",
      awards: 0,
    },
    quote: "Every smile starts with a perfect fit – that’s my promise.",
    accentColor: "#5c9e78",
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
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="h-1 w-full" style={{ background: member.accentColor }} />
            <div className="p-6">
              <p className="text-[13px] italic text-gray-500 mb-5 leading-relaxed border-l-2 pl-3"
                style={{ borderColor: member.accentColor }}>
                "{member.quote}"
              </p>
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

/* ================= MOBILE SWIPE VIEW ================= */

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
    <div className="lg:hidden flex flex-col min-h-screen bg-[#0e1612]">
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
              src={`/team/${member.file}`}
              alt={member.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1612] via-[#0e1612]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: dragging ? dragX : 0 }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />

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

        <div className="absolute top-6 right-6 z-10">
          <span className="text-white/40 text-sm font-light tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex-1 px-7 pt-6 pb-32 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">{member.name}</h2>
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-6" style={{ color: member.accentColor }}>
              {member.role}
            </p>
            <p className="text-sm italic text-white/50 mb-6 leading-relaxed border-l-2 pl-4"
              style={{ borderColor: member.accentColor }}>
              "{member.quote}"
            </p>
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
            <div className="space-y-4">
              {member.desc.split("\n\n").map((p, i) => (
                <p key={i} className="text-[15px] text-white/60 leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

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
              <Image src={`/team/${m.file}`} alt={m.name} fill className="object-cover object-top" />
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
    <main className="bg-[#f7f9fb] min-h-screen text-[#1a242f]">
      <Navbar />
      <motion.div
        style={{ scaleX: progress, background: team[activeIndex].accentColor }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[999]"
      />
      <div className="flex flex-col lg:flex-row">
        {/* LEFT COLUMN (text content) */}
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
                  <div
                    className="relative inline-block mb-5"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <motion.h2
                      animate={{ opacity: activeIndex === i ? 1 : 0.6, y: activeIndex === i ? 0 : 16 }}
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

        {/* RIGHT STICKY COLUMN (image) */}
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
                src={`/team/${team[activeIndex].file}`}
                alt={team[activeIndex].name}
                fill
                priority={activeIndex === 0}
                sizes="50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

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
                <Image src={`/team/${m.file}`} alt={m.name} fill className="object-cover object-top" />
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
      `}</style>
    </main>
  );
}

/* ================= ROOT EXPORT ================= */

export default function TeamPage() {
  return (
    <>
      <div className="lg:hidden">
        <MobileSwipeView />
      </div>
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </>
  );
}