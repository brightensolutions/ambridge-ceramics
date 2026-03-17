import Navbar from "../components/Navbar";
import Hero3D from "../components/home/Hero3D";
import UnifiedStatement from "../components/home/Statement";
import ServicesGrid from "../components/home/ServicesGrid";
import MaterialAuthority from "../components/home/materialauthority";
import Workflow from "../components/home/Workflow";
import StatsCounter from "../components/home/StatsCounter";
import Testimonial from "../components/home/Testimonial";
import QuickAccess from "../components/home/DigitalEcosystem";
import Awards from "../components/home/Awards";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-white text-black">

      <Navbar />
      
      {/* 3. SERVICES GRID — Four core service offerings */}
      <ServicesGrid />

      {/* 6. STATS COUNTER — Animated performance metrics */}
      <StatsCounter />

      {/* 7. TESTIMONIAL — Featured clinician quote */}
      <Testimonial />

      {/* 9. AWARDS — Scrolling accreditation marquee */}
      <Awards />

      <Footer />
    </main>
  );
}
