import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

import Link from "next/link";

const services = [
  {
    title: "Crown & Bridge",
    desc: "Precision-engineered zirconia and ceramic restorations crafted for strength, fit and aesthetics.",
    img: "/services/crown.jpg",
    link: "/services/crown-bridge",
  },
  {
    title: "AC Aligners",
    desc: "Digital orthodontic solutions designed for predictable and comfortable tooth movement.",
    img: "/services/aligners.jpg",
    link: "/services/aligners",
  },
  {
    title: "Implant Restorations",
    desc: "Custom abutments and full-arch implant solutions for long-term clinical success.",
    img: "/services/implants.jpg",
    link: "/services/implants",
  },
  {
    title: "Whitening Trays",
    desc: "Custom-fit trays ensuring uniform gel distribution and superior patient comfort.",
    img: "/services/whitening.jpg",
    link: "/services/whitening",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-20 px-10 bg-dentalCream">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black uppercase tracking-tight text-dentalForest">
            Clinical Services
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl">
            A comprehensive suite of digital dental laboratory solutions designed
            to support modern clinics with precision restorations and advanced workflows.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-28 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {services.map((service, i) => (
            <Reveal key={i}>
              <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">

                {/* IMAGE */}
                <div className="h-52 bg-gray-100 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-5">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-dentalForest">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>

                  <Link
                    href={service.link}
                    className="inline-block mt-4 text-xs font-bold tracking-widest uppercase border-b-2 border-dentalGold pb-1 hover:border-dentalForest"
                  >
                    Explore Service
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  );
}
