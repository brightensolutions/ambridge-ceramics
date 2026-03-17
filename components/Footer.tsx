"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

/* ============================================================
   TOKENS — mirrors Navbar exactly
   ============================================================ */
const FOREST    = "#152e1e";
const DEEP      = "#2d6e47";
const BRAND     = "#A2D8B2";
const OFF_WHITE = "#f7f9fb";

/* ============================================================
   DATA
   ============================================================ */
const COLS = [
  {
    heading: "Services",
    links: [
      { label: "Crowns, Bridges & Veneers",         href: "/services/crowns-bridges-veneers" },
      { label: "Implant Supported",                  href: "/services/implants"               },
      { label: "Digital Dentures",                   href: "/services/dentures"               },
      { label: "X-ina-Box Surgical Guides",          href: "/services/surgical-guides"        },
      { label: "Digital Smile Designs",              href: "/services/smile-design"           },
      { label: "Whitening Trays",                    href: "/services/whitening"              },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Meet the Team",           href: "/team"         },
      { label: "Awards & Accreditations", href: "/awards"       },
      { label: "Our Ethos",               href: "/ethos"        },
      { label: "Case Gallery",            href: "/gallery"      },
      { label: "Testimonials",            href: "/testimonials" },
      { label: "Downloads",               href: "/downloads"    },
    ],
  },
  {
    heading: "AC Aligners",
    links: [
      { label: "About AC Aligners",  href: "/ac-aligners"          },
      { label: "Case Submissions",   href: "/ac-aligners/cases"     },
      { label: "Aligner Pricing",    href: "/ac-aligners/pricing"   },
      { label: "Clinical Support",   href: "/ac-aligners/support"   },
    ],
  },
];

/* ============================================================
   FOOTER
   ============================================================ */
export default function Footer() {
  return (
    <footer style={{ fontFamily: "'DM Sans', sans-serif", background: FOREST }}>

      {/* ── MAIN BODY ── */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-16">

          {/* ── BRAND COLUMN ── */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <img
                src="/LOGO SVG.svg"
                alt="Ambridge Ceramics"
                style={{ height: "44px" }}
              />
            </Link>

            <p
              className="text-[13px] leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: "26ch" }}
            >
              A digital-first dental laboratory focused on precision restorations,
              clinical partnerships, and long-term aesthetic excellence.
            </p>

            {/* Contact list — mirrors Navbar top strip */}
            <ul className="space-y-3">
              {[
                { icon: <Phone size={12} color={BRAND} />,          label: "01765 607347",                  href: "tel:01765607347" },
                { icon: <Mail size={12} color={BRAND} />,           label: "info@ambridgeceramics.co.uk",   href: "mailto:info@ambridgeceramics.co.uk" },
                { icon: <MessageCircle size={12} color={BRAND} />,  label: "WhatsApp",                      href: "https://wa.me/447765607347" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors w-fit"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── LINK COLUMNS ── */}
          {COLS.map((col, ci) => (
            <div key={ci}>
              {/* Heading — same style as Navbar dropdown label */}
              <p
                className="text-[10px] font-black uppercase tracking-[0.35em] mb-6"
                style={{ color: BRAND }}
              >
                {col.heading}
              </p>

              <ul className="space-y-0">
                {col.links.map((link, li) => (
                  <li
                    key={li}
                    style={{ borderBottom: "1px solid rgba(162,216,178,0.07)" }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-3 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity -mr-0.5"
                        style={{ color: BRAND }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── SEND A CASE BAND ── mirrors the Navbar CTA button, full-width here */}
        <div
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 py-7 rounded-sm"
          style={{ border: `1px solid rgba(162,216,178,0.18)`, background: "rgba(162,216,178,0.04)" }}
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: BRAND }}>
              Ready to send a case?
            </p>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Submit digitally or request a collection. We'll handle the rest.
            </p>
          </div>
          <Link
            href="/send-a-case"
            className="flex-shrink-0 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] px-7 py-3.5 transition-all duration-300"
            style={{ background: BRAND, color: FOREST }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(162,216,178,0.85)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = BRAND;
            }}
          >
            Send a Case
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── BOTTOM STRIP ── mirrors Navbar top strip layout & style */}
      <div
        style={{
          borderTop: "1px solid rgba(162,216,178,0.1)",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © {new Date().getFullYear()} Ambridge Ceramics Laboratory
          </span>

          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy",   href: "/privacy"   },
              { label: "Terms of Service", href: "/terms"     },
              { label: "GDC Compliance",   href: "/compliance" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="text-[10px] font-bold uppercase tracking-[0.22em] transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <span
            className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Precision · Reliability · Partnership
          </span>
        </div>
      </div>
    </footer>
  );
}