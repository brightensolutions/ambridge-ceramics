"use client";
import { motion } from "framer-motion";
import { FileText, Truck, CreditCard, Activity } from "lucide-react";

const actions = [
  {
    title: "Case Portal",
    label: "Track Lab Progress",
    icon: <Activity size={18} strokeWidth={1.5} />,
  },
  {
    title: "Prescriptions",
    label: "Download Lab Forms",
    icon: <FileText size={18} strokeWidth={1.5} />,
  },
  {
    title: "Logistics",
    label: "Request Pre-paid Label",
    icon: <Truck size={18} strokeWidth={1.5} />,
  },
  {
    title: "Fee Guide",
    label: "Request Price List",
    icon: <CreditCard size={18} strokeWidth={1.5} />,
  },
];

const LABEL_STYLE = "text-[10px] tracking-[0.4em] uppercase font-black text-gray-400";

export default function QuickAccess() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {actions.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
              className="bg-white p-12 flex flex-col items-start text-left group transition-all"
            >
              <div className="mb-10 text-black group-hover:text-dentalForest transition-colors">
                {item.icon}
              </div>
              <p className={LABEL_STYLE}>{item.title}</p>
              <h3 className="text-xl font-bold tracking-tight text-black mt-2 group-hover:translate-x-1 transition-transform">
                {item.label}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}