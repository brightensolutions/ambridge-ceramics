"use client";
import { motion } from "framer-motion";

const LABEL_STYLE = "text-[10px] tracking-[0.4em] uppercase font-black text-gray-400";

export default function Testimonial() {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-12 bg-white border-y border-gray-100">
      <div className="container mx-auto max-w-[1500px]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-light leading-[1.2] text-black tracking-tight"
          >
            “Consistently precise restorations with excellent turnaround times.
            A dependable partner for complex clinical cases.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-black">
              Dr. Michael Carter
            </p>
            <p className={`${LABEL_STYLE} mt-3`}>
              London Dental Studio
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}