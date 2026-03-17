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
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}

const stats = [
    { value: 35, suffix: "+", label: "Years of Excellence", desc: "Decades of precision craftsmanship" },
    { value: 10, suffix: "k+", label: "Cases Delivered", desc: "Restorations shipped with care" },
    { value: 100, suffix: "+", label: "Partner Clinics", desc: "Trusted clinical relationships" },
    { value: 99, suffix: "%", label: "Satisfaction Rate", desc: "Consistent quality outcomes" },
];

export default function StatsCounter() {
    return (
        <section className="relative py-32 lg:py-40 bg-[#0a0a0a] overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,66,37,0.15),_transparent_60%)]" />

            <div className="container mx-auto max-w-[1500px] px-6 lg:px-12 relative z-10">

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] tracking-[0.4em] uppercase font-black text-white/30 mb-20 text-center"
                >
                    Laboratory Performance
                </motion.p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center px-6 lg:px-12"
                        >
                            <p className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-3">
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-sm font-bold uppercase tracking-widest text-dentalGold mb-2">
                                {stat.label}
                            </p>
                            <p className="text-xs text-white/40 leading-relaxed">
                                {stat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
