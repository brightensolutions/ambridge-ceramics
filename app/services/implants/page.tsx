import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ArrowLeft } from "lucide-react";

export default function ImplantsPage() {
    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-20 text-center uppercase">
                    Implant Supported(screw mentable)
                </h1>

                {/* Screw Retained */}
                <div className="mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-8 border-b border-gray-100 pb-4">
                        Implants. (Screw retained)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-screw", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group cursor-pointer flex flex-col items-center text-center">
                                <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden relative shadow-sm border border-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-dentalForest transition-colors px-2">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Cement Retained */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-8 border-b border-gray-100 pb-4">
                        Implants. (Cement retained)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            { name: "Anterior Crown", slug: "anterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior Crown", slug: "posterior-crown-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Anterior 3 Unit Bridge", slug: "anterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                            { name: "Posterior 3 Unit Bridge", slug: "posterior-3-unit-bridge-cement", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" },
                        ].map((product, idx) => (
                            <Link key={idx} href={`/services/implants/${product.slug}`} className="group cursor-pointer flex flex-col items-center text-center">
                                <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden relative shadow-sm border border-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-dentalForest transition-colors px-2">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
