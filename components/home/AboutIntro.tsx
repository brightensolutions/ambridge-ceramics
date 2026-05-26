export default function AboutIntro() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-6 lg:px-12" style={{ backgroundColor: "#f8faf9" }}>
      <div className="container mx-auto max-w-[1500px]">
        {/* Heading - centered */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
            About Ambridge Ceramics
          </h2>
        </div>

        {/* Text content - full width inside container */}
        <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            Ambridge Ceramics is a multi-award-winning UK dental laboratory providing high quality, custom‑made dental restorations and advanced digital workflow solutions for dentists across the UK. 
            We specialise in precision‑engineered crowns, bridges, veneers, implant supported restorations, dentures, and aligners, combining craftsmanship with cutting‑edge CAD/CAM technology to deliver predictable, aesthetic, and long‑lasting results.
          </p>
          <p>
            As a leading digital dental lab, we support seamless integration with all major intraoral scanners and offer full CAD design, 3D printing, and state‑of‑the‑art milling. Our technicians work with premium materials including fusion zirconia, lithium disilicate, precious metals and high‑performance polymers, to ensure every restoration meets the highest standards of fit, strength, and natural aesthetics.
          </p>
          <p>
            Clinicians choose Ambridge Ceramics for our reliability, technical expertise, and commitment to innovation. We provide personalised case support, treatment planning, guidance and transparent communication from prescription to final fit. Our digital workflows help practices reduce chair time, improve accuracy, and enhance the patient experience.
          </p>
          <p>
            We are also developing next‑generation digital tools, including a 3D restoration configurator designed to transform case planning and elevate clinical communication. This focus on innovation ensures our clients benefit from faster turnaround times, improved consistency, and a future‑ready digital partnership.
          </p>
          <p>
            With a strong reputation for quality, regulatory compliance, and exceptional service, Ambridge Ceramics is the trusted choice for dentists seeking a premium UK dental laboratory that delivers outstanding restorations and dependable digital support.
          </p>
        </div>
      </div>
    </section>
  );
}