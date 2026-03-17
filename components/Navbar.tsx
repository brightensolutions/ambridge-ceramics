"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

/* ============================================================
   TOKENS
   ============================================================ */
const FOREST   = "#152e1e";   // navbar bg, deep text
const DEEP     = "#2d6e47";   // hover text, borders
const BRAND    = "#A2D8B2";   // fills, CTA bg, accents — NEVER as text on white
const OFF_WHITE = "#f7f9fb";  // top strip bg

/* ============================================================
   NAV DATA
   ============================================================ */
const NAV = [
  {
    label: "About Us",
    children: [
      { label: "Meet the Team",          href: "/team"   },
      { label: "Awards & Accreditations", href: "/awards" },
      { label: "Our Ethos",              href: "/ethos"  },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Crowns, Bridges & Veneers",       href: "/services/crowns-bridges-veneers" },
      { label: "Implant Supported (Screw-mentable)", href: "/services/implants"              },
      { label: "Digital Dentures",                 href: "/services/dentures"               },
      { label: "X-ina-Box (Surgical Guides)",      href: "/services/surgical-guides"        },
      { label: "Digital Smile Designs",            href: "/services/smile-design"           },
      { label: "Whitening Trays",                  href: "/services/whitening"              },
    ],
  },
  { label: "AC Aligners", href: "/ac-aligners" },
  {
    label: "Resources",
    children: [
      { label: "Downloads",    href: "/downloads"    },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Case Gallery", href: "/gallery"      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

/* ============================================================
   DESKTOP DROPDOWN
   ============================================================ */
function Dropdown({ items }: { items: { label: string; href: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-full left-0 mt-0 w-72 bg-white shadow-2xl z-50"
      style={{ borderTop: `3px solid ${BRAND}` }}
    >
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="flex items-center justify-between px-7 py-3.5 group transition-colors"
          style={{ borderBottom: "1px solid #f0f4f1" }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em] transition-colors"
            style={{ color: "#2F3A45" }}
            onMouseEnter={e => (e.currentTarget.style.color = DEEP)}
            onMouseLeave={e => (e.currentTarget.style.color = "#2F3A45")}
          >
            {item.label}
          </span>
          <span
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: BRAND }}
          >
            →
          </span>
        </Link>
      ))}
    </motion.div>
  );
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[380px] z-50 flex flex-col overflow-y-auto"
            style={{ background: FOREST }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-7 py-6"
              style={{ borderBottom: `1px solid rgba(162,216,178,0.15)` }}
            >
              <img
                src="/LOGO SVG.svg"
                alt="Ambridge Ceramics"
                style={{ height: "30px" }}
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
                style={{ background: "rgba(162,216,178,0.1)" }}
              >
                <X size={18} color={BRAND} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 py-4">
              {NAV.map((item, i) => (
                <div key={i}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition-colors"
                      style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(162,216,178,0.08)" }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition-colors"
                        style={{
                          color: expanded === item.label ? BRAND : "rgba(255,255,255,0.75)",
                          borderBottom: "1px solid rgba(162,216,178,0.08)",
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          style={{
                            transform: expanded === item.label ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s",
                            color: BRAND,
                          }}
                        />
                      </button>

                      <AnimatePresence>
                        {expanded === item.label && item.children && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden", background: "rgba(0,0,0,0.2)" }}
                          >
                            {item.children.map((child, j) => (
                              <Link
                                key={j}
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
                                style={{
                                  color: "rgba(162,216,178,0.8)",
                                  borderBottom: "1px solid rgba(162,216,178,0.05)",
                                }}
                              >
                                <span style={{ color: BRAND, fontSize: "8px" }}>◆</span>
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Drawer footer */}
            <div
              className="px-7 py-6 space-y-3"
              style={{ borderTop: `1px solid rgba(162,216,178,0.15)` }}
            >
              <Link
                href="/send-a-case"
                onClick={onClose}
                className="flex items-center justify-center w-full py-4 text-[11px] font-bold uppercase tracking-[0.22em] rounded-sm transition-colors"
                style={{ background: BRAND, color: FOREST }}
              >
                Send a Case
              </Link>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="tel:01765607347"
                  className="flex items-center gap-2 text-[10px] font-semibold tracking-wider"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <Phone size={12} color={BRAND} />
                  01765 607347
                </a>
                <a
                  href="https://wa.me/447765607347"
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] font-semibold tracking-wider"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <MessageCircle size={12} color={BRAND} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN NAVBAR
   ============================================================ */
export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [openMenu, setOpenMenu]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const navRef                        = useRef<HTMLElement>(null);
  const closeTimer                    = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* ── TOP STRIP (contact bar) ── visible only when not scrolled */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              key="top-strip"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: OFF_WHITE, overflow: "hidden", borderBottom: "1px solid #e8efe9" }}
            >
              <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <a
                    href="tel:01765607347"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
                    style={{ color: "#6B7280" }}
                    onMouseEnter={e => (e.currentTarget.style.color = DEEP)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
                  >
                    <Phone size={11} color={DEEP} />
                    01765 607347
                  </a>
                  <a
                    href="mailto:info@ambridgeceramics.co.uk"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
                    style={{ color: "#6B7280" }}
                    onMouseEnter={e => (e.currentTarget.style.color = DEEP)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
                  >
                    <Mail size={11} color={DEEP} />
                    info@ambridgeceramics.co.uk
                  </a>
                  <a
                    href="https://wa.me/447765607347"
                    target="_blank"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
                    style={{ color: "#6B7280" }}
                    onMouseEnter={e => (e.currentTarget.style.color = DEEP)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
                  >
                    <MessageCircle size={11} color={DEEP} />
                    WhatsApp
                  </a>
                </div>
                <span className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#9CA3AF" }}>
                  Excellence in Dental Ceramics
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN BAR ── always dark forest */}
        <div
          className="transition-all duration-500"
          style={{
            background: FOREST,
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
          }}
        >
          <div
            className={`max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >

            {/* LOGO — brand green (#A2D8B2) renders perfectly on dark forest bg */}
            <Link href="/" className="flex-shrink-0 mr-12">
              <img
                src="/LOGO SVG.svg"
                alt="Ambridge Ceramics"
                className="transition-all duration-500"
                style={{ height: scrolled ? "36px" : "44px" }}
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {NAV.map((item, i) =>
                item.href ? (
                  /* Simple link — no dropdown */
                  <Link
                    key={i}
                    href={item.href}
                    className="text-[11px] font-bold uppercase tracking-[0.18em] py-2 transition-colors"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {item.label}
                  </Link>
                ) : (
                  /* Dropdown trigger */
                  <div
                    key={i}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] py-2 transition-colors"
                      style={{
                        color: openMenu === item.label ? BRAND : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s",
                          opacity: 0.6,
                        }}
                      />
                    </button>

                    {/* Bottom indicator */}
                    <motion.div
                      animate={{ scaleX: openMenu === item.label ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                      style={{ background: BRAND }}
                    />

                    <AnimatePresence>
                      {openMenu === item.label && item.children && (
                        <div onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                          <Dropdown items={item.children} />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden lg:block">
                <GlobalSearch />
              </div>

              {/* Send a Case CTA — outlined so it reads distinct from logo */}
              <Link
                href="/send-a-case"
                className="hidden xl:flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300"
                style={{
                  border: `1.5px solid ${BRAND}`,
                  color: BRAND,
                  background: "transparent",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = BRAND;
                  (e.currentTarget as HTMLElement).style.color = FOREST;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = BRAND;
                }}
              >
                Send a Case
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-sm transition-colors"
                style={{ background: "rgba(162,216,178,0.12)" }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} color={BRAND} />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}           