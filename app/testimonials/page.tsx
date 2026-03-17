import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

const testimonials = [
  {
    name: "Dr. James Walker",
    clinic: "Walker Dental Clinic",
    text: "Ambridge Ceramics consistently delivers restorations with exceptional precision. Their turnaround time and communication make them a reliable clinical partner.",
  },
  {
    name: "Dr. Emily Carter",
    clinic: "Carter & Co. Dental",
    text: "The quality of crown and bridge work is outstanding. Marginal fit and aesthetics are always on point, even for complex cases.",
  },
  {
    name: "Dr. Daniel Hughes",
    clinic: "Hughes Implant Centre",
    text: "Their implant restorations have been consistently accurate and predictable. A dependable laboratory we trust for high-value cases.",
  },
  {
    name: "Dr. Sophie Bennett",
    clinic: "Smile Design Studio",
    text: "From digital planning to final delivery, the workflow is seamless. Patients love the aesthetic results.",
  },
  {
    name: "Dr. Michael Reed",
    clinic: "Precision Dental Care",
    text: "Professional, responsive, and technically strong. We consider them an extension of our clinical team.",
  },
  {
    name: "Dr. Olivia Turner",
    clinic: "Turner Dental Practice",
    text: "Excellent craftsmanship and reliable service. Their attention to detail truly sets them apart.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-44 pb-16 px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-6">
            Testimonials
          </p>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.05]">
            Trusted By <br /> Clinicians.
          </h1>

          <p className="mt-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Feedback from dental professionals who rely on our laboratory for
            precision restorations, consistent quality, and dependable clinical
            support.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL GRID */}
      <Reveal>
        <section className="py-28 px-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="p-8 bg-dentalCream rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition"
              >
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  &quot;{item.text}&quot;
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {item.clinic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Footer />
    </main>
  );
}
