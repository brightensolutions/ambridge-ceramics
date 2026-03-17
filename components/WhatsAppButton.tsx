"use client";
import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const phone = "1234567890"; // 🔁 replace later with real number

  const message =
    "Hello, I’d like to discuss working with your dental laboratory.";

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-4 rounded-full shadow-2xl">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-6 h-6 fill-white"
        >
          <path d="M19.11 17.38c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.21-.45-2.3-1.44-.85-.76-1.42-1.7-1.58-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.13-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.36-.26.29-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.15.19 1.99 3.04 4.83 4.26.67.29 1.19.46 1.59.59.67.21 1.27.18 1.75.11.53-.08 1.7-.7 1.94-1.38.24-.67.24-1.25.17-1.38-.07-.13-.26-.21-.55-.36zM16 3C9.37 3 4 8.37 4 15c0 2.64.86 5.08 2.32 7.06L5 29l7.16-1.88A11.94 11.94 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3z" />
        </svg>

        {/* Text */}
        <span className="text-xs font-bold tracking-widest uppercase">
          Chat
        </span>
      </div>
    </motion.a>
  );
}
