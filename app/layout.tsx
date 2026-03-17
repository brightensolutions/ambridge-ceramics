import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import CursorGlow from "../components/ui/CursorGlow";
import PageTransition from "../components/PageTransition";
import FloatingCTA from "../components/FloatingCTA";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";

/* ─────────────────────────────────────────────
   BODY FONT — DM Sans
   Clean, modern, highly legible for clinical B2B.
   Replaces Inter (too generic) and Plus_Jakarta_Sans (unused).
───────────────────────────────────────────── */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambridge Ceramics | Precision Dental Laboratory",
  description: "Award-winning UK dental laboratory specialising in implant prosthetics, digital workflows and restorative ceramics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        <CursorGlow />
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
          <FloatingCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}