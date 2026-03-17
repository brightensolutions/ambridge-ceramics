import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-28 px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-6">
            About Ambridge
          </p>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
            A Laboratory Built <br />
            For Clinical Precision.
          </h1>

          <p className="mt-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
            Ambridge Ceramics is a digital-first dental laboratory dedicated to
            delivering precision restorations, predictable outcomes, and
            long-term clinical partnerships. Our work combines advanced digital
            workflows with master-level craftsmanship refined over decades.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <Reveal>
        <section className="py-28 px-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-6">
                Our Story
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Founded with a commitment to precision and reliability,
                Ambridge Ceramics has grown into a trusted clinical partner for
                dental practices across the region. Our laboratory combines
                modern digital technologies with traditional ceramic artistry to
                deliver restorations that meet the highest standards of accuracy
                and aesthetics.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We believe that strong collaboration between clinicians and
                technicians leads to better patient outcomes. Every case is
                approached with care, discipline, and a deep respect for the
                clinical process.
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl h-[380px] flex items-center justify-center text-gray-400 text-sm">
              Lab Image Placeholder
            </div>
          </div>
        </section>
      </Reveal>

      {/* VALUES */}
      <Reveal>
        <section className="py-28 px-10 bg-dentalCream">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-16">
              Our Philosophy
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-bold text-lg mb-3">Precision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every restoration is crafted with meticulous attention to
                  detail using advanced digital workflows and expert finishing.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Reliability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Clinics trust us for consistent quality, dependable turnaround
                  times, and long-term clinical support.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Partnership</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We work closely with dentists to ensure predictable outcomes
                  and patient satisfaction on every case.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <Reveal>
        <section className="py-28 px-10 border-t border-gray-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl font-black">35+</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-2">
                Years Experience
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">10k+</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-2">
                Cases Delivered
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">100+</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-2">
                Clinics Served
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">UK</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-2">
                Quality Standards
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Footer />
    </main>
  );
}
