"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import PageHeader from "../../components/PageHeader";
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clinicName: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          clinicName: formData.clinicName,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", clinicName: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-[#a2d8b2] selection:text-[#152e1e]">
      <Navbar />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-52 pb-20 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            badge="Contact // Lab Logistics" 
            title="Clinical Collaboration" 
            subtitle="Get in touch with our laboratory to discuss cases, request pricing schedules, digital design onboarding configurations, or explore specific clinical workflow options." 
          />
        </div>
      </section>

      {/* ─── 2. CONTACT GRID SECTION ─── */}
      <section className="py-24 px-6 lg:px-12 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT COLUMN: CONTACT DETAILS (5 Columns) */}
            <div className="lg:col-span-5 space-y-12">
              <Reveal delay={0.05}>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-2">
                    Get In Touch
                  </h2>
                  <p className="text-slate-500 font-light text-sm mb-10">
                    Connect with our technical lab departments directly.
                  </p>

                  <div className="space-y-8">
                    {/* Phone Block */}
                    <div className="flex gap-5 items-start group">
                      <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-[#152e1e] group-hover:bg-[#a2d8b2] transition-colors duration-300 shrink-0">
                        <Phone size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                          Phone Support
                        </p>
                        <p className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#152e1e]">
                          01765 607347
                        </p>
                      </div>
                    </div>

                    {/* Email Block */}
                    <div className="flex gap-5 items-start group">
                      <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-[#152e1e] group-hover:bg-[#a2d8b2] transition-colors duration-300 shrink-0">
                        <Mail size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                          Digital Inquiries
                        </p>
                        <p className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 break-all">
                          info@ambridgeceramics.co.uk
                        </p>
                      </div>
                    </div>

                    {/* Location Block */}
                    <div className="flex gap-5 items-start group">
                      <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-[#152e1e] group-hover:bg-[#a2d8b2] transition-colors duration-300 shrink-0">
                        <MapPin size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                          Central Laboratory Location
                        </p>
                        <p className="text-xl font-medium text-slate-900 font-light leading-relaxed">
                          United Kingdom
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* WHATSAPP CTA */}
              <Reveal delay={0.1}>
                <div className="pt-4">
                  <a
                    href="https://wa.me/447765607347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-[#152e1e] hover:bg-[#152e1e] hover:text-white hover:border-[#152e1e] text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Business</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: PREMIUM DARK CONTAINER DISPATCH FORM (7 Columns) */}
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="bg-[#152e1e] p-8 md:p-12 rounded-3xl shadow-xl text-white relative overflow-hidden border border-emerald-950">
                  {/* Subtle decorative background gradient glow */}
                  <div className="absolute -right-24 -top-24 w-72 h-72 bg-[#a2d8b2]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                    Send Digital Inquiry
                  </h2>
                  <p className="text-emerald-200/60 font-light text-xs mb-8">
                    Fill out the laboratory dispatch form below to routing system.
                  </p>

                  {status === "success" ? (
                    <div className="border border-emerald-800/40 bg-emerald-950/40 p-8 rounded-2xl text-center space-y-4 py-12">
                      <div className="w-14 h-14 bg-[#a2d8b2] text-[#152e1e] flex items-center justify-center rounded-full mx-auto shadow-md">
                        <CheckCircle2 size={28} />
                      </div>
                      <p className="font-black uppercase tracking-widest text-sm text-white pt-2">Message Dispatched</p>
                      <p className="text-sm text-emerald-100/70 font-light max-w-sm mx-auto leading-relaxed">
                        Your technical support transmission was processed completely. A coordinator will touch base shortly.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-4 text-xs font-black uppercase tracking-widest text-[#a2d8b2] underline hover:text-white transition"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-emerald-900/60 bg-emerald-950/40 text-white placeholder-emerald-100/40 px-5 py-4 text-sm rounded-xl focus:outline-none focus:border-[#a2d8b2] focus:ring-1 focus:ring-[#a2d8b2] transition-all"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-emerald-900/60 bg-emerald-950/40 text-white placeholder-emerald-100/40 px-5 py-4 text-sm rounded-xl focus:outline-none focus:border-[#a2d8b2] focus:ring-1 focus:ring-[#a2d8b2] transition-all"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Clinic Name"
                          required
                          value={formData.clinicName}
                          onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                          className="w-full border border-emerald-900/60 bg-emerald-950/40 text-white placeholder-emerald-100/40 px-5 py-4 text-sm rounded-xl focus:outline-none focus:border-[#a2d8b2] focus:ring-1 focus:ring-[#a2d8b2] transition-all"
                        />
                      </div>

                      <div>
                        <textarea
                          placeholder="Case Details / Message Description"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full border border-emerald-900/60 bg-emerald-950/40 text-white placeholder-emerald-100/40 px-5 py-4 text-sm rounded-xl focus:outline-none focus:border-[#a2d8b2] focus:ring-1 focus:ring-[#a2d8b2] transition-all resize-none"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-red-400 text-xs font-bold uppercase tracking-wider">
                          Transmission failed. Check connections and retry.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-[#a2d8b2] hover:bg-[#b5e6c3] text-[#152e1e] py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.99] mt-2"
                      >
                        {status === "submitting" ? "Processing Dispatch..." : "Submit Inquiry"}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. MAP SECTION ─── */}
      <section className="px-6 lg:px-12 py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="h-[460px] w-full border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-[#fafafa]">
              <iframe
                src="https://www.google.com/maps?q=54.2354,-1.3444&z=14&output=embed"
                className="w-full h-full grayscale contrast-[1.1] brightness-[0.98]"
                loading="lazy"
                title="Laboratory Location Map"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}