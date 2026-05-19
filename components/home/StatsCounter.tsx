"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const controls = animate(0, value, {
                        duration: 2,
                        ease: [0.22, 1, 0.36, 1],
                        onUpdate: (v) => setDisplay(Math.round(v)),
                    });
                    return () => controls.stop();
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <span ref={ref} className="font-black tracking-tighter text-white">
            {display}
            <span className="text-[#a2d8b2] ml-0.5">{suffix}</span>
        </span>
    );
}

const stats = [
    { value: 40, suffix: "+", label: "Years of Excellence", desc: "Decades of precision dental craftsmanship and trust." },
    { value: 250, suffix: "k+", label: "Cases Delivered", desc: "Flawless restorations shipped worldwide with care." },
    { value: 5000, suffix: "+", label: "Partner Clinics", desc: "Long-standing, reliable clinical relationships." },
    { value: 99, suffix: "%", label: "Satisfaction Rate", desc: "Consistent quality dental workflow outcomes." },
];

export default function StatsCounter() {
    return (
        <section className="relative py-24 lg:py-36 bg-[#0a0a0a] overflow-hidden">
            {/* Ambient Deep Forest Green Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(26,54,38,0.45),_transparent_60%)] pointer-events-none" />

            <div className="container mx-auto max-w-[1500px] px-6 lg:px-12 relative z-10">

                {/* Section Sub-header Tracking Label */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs sm:text-sm tracking-[0.35em] uppercase font-bold text-gray-500"
                    >
                        — LABORATORY PERFORMANCE —
                    </motion.p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-white/10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                            viewport={{ once: true }}
                            className="text-center px-4 sm:px-8 lg:px-10 flex flex-col justify-start"
                        >
                            {/* Adjusted Number Font Size to be cleaner and more proportional */}
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 select-none balance">
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            
                            {/* Prominent Legible Labels */}
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
                                {stat.label}
                            </h3>
                            
                            {/* Description Text */}
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {stat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}