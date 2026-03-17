"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clinicName: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.type === "email" ? "email" : e.target.placeholder === "Full Name" ? "name" : e.target.placeholder === "Clinic Name" ? "clinicName" : "message"]: e.target.value });
    // Note: Better to add 'name' attributes to inputs for cleaner handling, but adapting to existing structure
  };

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
          message: formData.message
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
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-44 pb-16 px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-6">
            Contact
          </p>

          <p className="mt-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Get in touch with our laboratory to discuss cases, request quotations,
            or explore clinical collaboration opportunities.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <Reveal>
        <section className="py-28 px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

            {/* LEFT SIDE — INFO */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-black mb-6">Contact Details</h2>

                <div className="space-y-6 text-gray-600">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Phone
                    </p>
                    <p className="text-lg font-semibold">01765 607347</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Email
                    </p>
                    <p className="text-lg font-semibold">
                      info@ambridgeceramics.co.uk
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Location
                    </p>
                    <p className="text-lg font-semibold">
                      United Kingdom
                    </p>
                  </div>
                </div>
              </div>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/447765607347"
                target="_blank"
                className="inline-block mt-6 px-8 py-4 bg-dentalForest text-black text-xs font-bold tracking-widest uppercase hover:opacity-90 transition"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="bg-dentalCream p-10 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-black mb-8">Send Inquiry</h2>

              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <p className="font-bold mb-2">Message Sent!</p>
                  <p className="text-sm">Thank you for contacting us. We will get back to you shortly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs font-bold uppercase tracking-widest underline"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-dentalForest transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-dentalForest transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Clinic Name"
                      required
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-dentalForest transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Case Details / Message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-dentalForest transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm font-bold">Failed to send message. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-dentalForest text-black py-4 font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* MAP */}
      <Reveal>
        <section className="px-10 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="h-[420px] w-full border border-gray-200 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=54.2354,-1.3444&z=14&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <Footer />
    </main>
  );
}
