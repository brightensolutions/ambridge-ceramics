"use client";
import { motion } from "framer-motion";

// Import SVGs as components
import IvoclarLogo from "../../public/logos/ivoclar.svg";
import StraumannLogo from "../../public/logos/straumann.svg";
import ThreeShapeLogo from "../../public/logos/3shape.svg";
import AmbridgeLogo from "../../public/logos/ambridge.svg";

const partners = [
  { name: "Ambridge", Logo: AmbridgeLogo },
  { name: "Ivoclar", Logo: IvoclarLogo },
  { name: "Straumann", Logo: StraumannLogo },
  { name: "3Shape", Logo: ThreeShapeLogo },
  { name: "Dentsply Sirona", Logo: IvoclarLogo }, // Reuse one for now to avoid errors, or duplicate
];

const LABEL_STYLE = "text-[10px] tracking-[0.4em] uppercase font-black text-gray-400";

export default function MaterialAuthority() {
  return (
    <section className="py-20 bg-white border-t border-gray-50">
      <div className="container mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="flex flex-col items-center">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${LABEL_STYLE} mb-12`}
          >
            Authorized Laboratory Partner
          </motion.p>

          <div className="w-full flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center cursor-default group"
              >
                <partner.Logo className="h-8 w-auto fill-gray-400 group-hover:fill-[#A2D8B2] transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 w-16 h-[1px] bg-gray-100" />
        </div>
      </div>
    </section>
  );
}