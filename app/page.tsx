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
import FeaturedServices from "../components/home/FeaturedServices";
import AboutIntro from "../components/home/AboutIntro"; // NEW

export default function Home() {
  return (
    <main className="bg-white text-black">
      <Navbar />
      <Hero3D />

      {/* NEW INTRODUCTION SECTION */}
      <AboutIntro />

      <FeaturedServices />
      <ServicesGrid />
      <StatsCounter />
      <Testimonial />
      <Awards />
      <Footer />
    </main>
  );
}