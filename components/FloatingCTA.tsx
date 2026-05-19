"use client";

import Link from "next/link";

export default function FloatingCTA() {
  return (
    <Link
      href="/contact"
      className="
        fixed 
        bottom-6 
        right-6 
        z-[90]
        bg-[#1A3626] 
        text-white
        px-6 
        py-4 
        rounded-full 
        shadow-2xl
        text-xs 
        font-bold 
        uppercase 
        tracking-widest
        hover:scale-105
        transition-all
        duration-300
      "
    >
      Send Case
    </Link>
  );
}