"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  CheckCircle2,
  Send,
  RefreshCw,
  Upload,
  Scan,
  Users,
  Microscope,
  Award,
  Clock,
} from "lucide-react";

// Components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import PageHeader from "../../components/PageHeader";

export default function ACAlignersPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSendScan = () => {
    setUploadStatus("Demo: STL upload simulation. In production, integrate with your backend.");
    setTimeout(() => setUploadStatus(null), 3000);
  };

  // Workflow steps - numbers removed, all boxes equal height
  const workflowSteps = [
    {
      title: "SCAN SUBMISSION",
      description: "Clinicians send STL files directly from their preferred scanner.",
      icon: Scan,
    },
    {
      title: "ORTHODONTIST-LED TREATMENT PLANNING",
      description: "All digital proposals are reviewed by orthodontists, reducing back‑and‑forth and speeding up case approval.",
      icon: Users,
    },
    {
      title: "TECHNICAL REFINEMENT",
      description: "Qualified technicians check and process every case to ensure precision and clinical suitability.",
      icon: Microscope,
    },
    {
      title: "PREMIUM MANUFACTURING",
      description: "Each aligner is produced using high‑quality materials and finished by hand for clarity, comfort, and durability.",
      icon: Award,
    },
    {
      title: "DELIVERY AND SUPPORT",
      description: "Fast turnaround times and direct communication with our technical team throughout the case.",
      icon: Clock,
    },
  ];

  return (
    <main className="bg-white min-h-screen text-slate-900 font-sans selection:bg-emerald-900 selection:text-white">
      <Navbar />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 origin-left z-[1000]"
      />

      {/* HERO SECTION */}
      <section className="relative pt-52 pb-20 px-6 lg:px-12 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-50/40 to-transparent" />
          <img
            src="https://placehold.co/1920x1080/eef2f6/1e293b?text=AC+Aligners+Hero"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <PageHeader
            badge="Premium Aligner System"
            title="AC Aligners System"
            subtitle="Digital Precision for Predictable Results. Experience our digitally designed aligner solution that prioritises both aesthetics and long-term stability for your patients."
          />
        </div>
      </section>

      {/* PREMIUM CLARITY SECTION (1st section) */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 uppercase">
                  Premium Clarity, <br />
                  <span className="text-emerald-700">Confident Movement,</span>{" "}
                  <br />
                  Clinician‑Led Results
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  A premium clear aligner system at an affordable cost
                </p>
                <p className="text-slate-500 leading-relaxed">
                  AC Aligners deliver the predictability and comfort clinicians
                  expect from a high‑end system without the inflated price tag.
                  Made from premium, medical‑grade clear aligner material, each
                  appliance offers exceptional clarity, durability, and patient
                  comfort. This gives patients confidence throughout treatment
                  while ensuring the aligners perform reliably from start to
                  finish.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  Designed and manufactured in the UK by Ambridge Ceramics, AC
                  Aligners provide a cost‑effective solution for everyday
                  orthodontic and aesthetic cases, backed by the standards of a
                  specialist dental laboratory.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-slate-100"
                  >
                    <img
                      src={`/ac-aligners/Picture${num}.jpg`}
                      alt={`AC Aligners showcase ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: CRAFTED WITH PRECISION - images not stretched */}
      <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: "#f8faf9" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Crafted with precision. <br />
                <span className="text-emerald-700">
                  Guided by orthodontic expertise.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 flex justify-center items-center">
                  <img
                    src="/ac-aligners/Picture7.jpg"
                    alt="AC Aligners crafted precision 1"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 flex justify-center items-center">
                  <img
                    src="/ac-aligners/Picture8.jpg"
                    alt="AC Aligners crafted precision 2"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                <p className="text-slate-500 text-lg leading-relaxed">
                  Every AC Aligners case benefits from the same craftsmanship
                  and clinical oversight that define Ambridge Ceramics.
                </p>
                <div className="space-y-3">
                  {[
                    "Premium clear aligner material for enhanced clarity, strength, and patient comfort",
                    "Orthodontist‑overseen digital proposals to ensure clinically responsible movement and reduce the need for repeated redesigns",
                    "Qualified dental technicians checking, processing, and refining every case",
                    "Hand‑finished detailing for smooth edges and a comfortable fit",
                    "Predictable, controlled staging for reliable tooth movement",
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 leading-relaxed pt-2">
                  This combination of premium materials, orthodontic oversight,
                  and technical expertise creates a service that feels truly
                  high‑end while remaining accessible for everyday practice.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: DIGITAL WORKFLOW + CHOOSE + IMAGES */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center text-slate-900 uppercase mb-4">
              A digital‑only workflow for accuracy and efficiency
            </h2>
            <p className="text-lg text-slate-500 text-center max-w-3xl mx-auto mb-12">
              AC Aligners are available exclusively through intra‑oral scans,
              ensuring a streamlined, modern workflow with exceptional accuracy.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-24">
            {workflowSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all h-full flex flex-col">
                  <step.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-base font-extrabold text-slate-800 mb-3 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center text-slate-900 uppercase mb-12">
              Choose AC Aligners and stay in control.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 flex justify-center items-center">
              <img
                src="/ac-aligners/Picture9.jpg"
                alt="AC Aligners option 1"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 flex justify-center items-center">
              <img
                src="/ac-aligners/Picture10.jpg"
                alt="AC Aligners option 2"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CLINICIANS CHOOSE */}
      <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: "#f8faf9" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase mb-8">
                  Why clinicians choose AC Aligners
                </h2>
                <div className="space-y-3">
                  {[
                    "Premium clear aligner material for clarity, comfort, and durability",
                    "Orthodontist‑overseen digital proposals for clinically responsible movement",
                    "Qualified technicians checking and processing every case",
                    "Cost‑effective without compromising on quality",
                    "UK‑manufactured with consistent quality control",
                    "Fast turnaround times and responsive support",
                    "Ideal for mild to moderate orthodontic and aesthetic cases",
                    "A premium service at an affordable cost",
                  ].map((reason, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/ac-aligners/Picture11.jpg"
                  alt="AC Aligners clinical advantage"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ SECTION: Image left, content right - using Picture12.png */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-100 flex justify-center items-center">
                <img
                  src="/ac-aligners/Picture12.png"
                  alt="FAQ illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase mb-10">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Are AC Aligners suitable for all cases?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      They are ideal for mild to moderate alignment, aesthetic
                      improvements, and pre‑restorative positioning. Complex cases
                      can be reviewed on request.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Do orthodontists really oversee the digital proposals?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes every digital plan is reviewed by orthodontists to ensure
                      clinically responsible movement and reduce the need for
                      redesigns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Do you accept all intra‑oral scanners?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes. AC Aligners are compatible with all major IOS systems.
                      Simply connect, export and upload your STL files.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      How long is the turnaround time?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Digital planning typically begins within 48 hours of receiving
                      your scan, with manufacturing following promptly after
                      approval.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEW FINAL SECTION: Start your first AC Aligners case - text left, image right */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left column: text content */}
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase mb-6">
                  Start your first AC Aligners case
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  If you’re looking for a premium‑quality aligner system with
                  orthodontic oversight, qualified technician support, and a
                  fully digital workflow all at an affordable cost — AC Aligners
                  are ready to support your practice.
                </p>
                <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                  <Send className="w-5 h-5" />
                  Speak to the Ambridge Ceramics team today
                </button>
                <p className="text-slate-400 text-sm mt-4">
                  to begin your first case.
                </p>
              </div>
            </Reveal>

            {/* Right column: image (using Picture13.jpg as placeholder) */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-100 flex justify-center items-center">
                <img
                  src="/ac-aligners/Picture13.jpg"
                  alt="Start your AC Aligners case"
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}