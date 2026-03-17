"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, Check, Clock, Shield, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { use } from "react";
import { useState } from "react";

// Model component
function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

// This would typically come from a CMS or API
const productData = {
    // Screw Retained Products
    "anterior-crown-screw": {
        name: "Anterior Screw‑Retained Implant Crown & Bridge — Fusion‑Zirconia (Screwmentable)",
        category: "Screw Retained",
        type: "anterior",
        retention: "screw",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
        model: "/3d-model/1.glb", // Path to the GLB file in public/3d-model/
        description: "A digitally designed anterior implant restoration combining our exclusive Fusion‑Zirconia crown or bridge with a precision‑milled CAD/CAM titanium custom abutment. The abutment is laboratory‑bonded and anodised gold to enhance soft‑tissue warmth and optimise the emergence profile. This screw‑retained \"screwmentable\" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw‑retained solution.",
        material: "Fusion‑Zirconia — a multilayer zirconia with a continuous dentine‑to‑enamel gradient, natural translucency and high flexural strength. Custom Titanium Abutment — CAD/CAM‑milled Grade 5 titanium, anodised gold for improved soft‑tissue integration and enhanced aesthetic blending. Both components are fully CE‑ and UKCA‑marked with complete batch traceability.",
        benefits: [
            "Screw‑retained design for full clinical retrievability",
            "Gold‑anodised titanium abutment for warm soft‑tissue aesthetics",
            "Optimised emergence profile for stable peri‑implant tissue support",
            "Fusion‑Zirconia crown for natural translucency and long‑term strength",
            "Excellent marginal accuracy through CAD/CAM design",
            "Reduced risk of residual cement complications",
            "Biocompatible, stable and fully traceable."
        ],
        cutBackOption: {
            title: "Cut‑Back / Micro‑Layered Aesthetic Option",
            subtitle: "Enhanced Aesthetic Version",
            description: "For high‑visibility anterior implant cases, we offer a cut‑back Fusion‑Zirconia crown bonded to the custom abutment, finished with a micro‑layered feldspathic‑enriched ceramic on the labial surface. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
            whyChoose: [
                "Increased vitality and enamel‑like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for single centrals and aesthetic‑critical implant sites",
                "Maintains zirconia strength while elevating ceramic beauty"
            ],
            note: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations."
        },
        specifications: {
            material: "Fusion-Zirconia & Titanium Abutment",
            shade: "Custom matched to adjacent teeth",
            connection: "Internal hex / Tri-channel",
            screwMaterial: "Titanium alloy",
            warranty: "5 years"
        },
        leadTime: "7-10 business days",
        warranty: "5 years"
    }
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = productData[slug as keyof typeof productData];

    const [materialOpen, setMaterialOpen] = useState(false);
    const [benefitsOpen, setBenefitsOpen] = useState(false);
    const [cutBackOpen, setCutBackOpen] = useState(false);

    // If product not found, show dummy content
    if (!product) {
        const dummyProduct = {
            name: "sample implant product",
            category: "Sample Category",
            type: "sample",
            retention: "sample",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
            description: "This is a sample product description for demonstration purposes.",
            features: [
                "Sample feature 1",
                "Sample feature 2",
                "Sample feature 3"
            ],
            specifications: {
                material: "Sample Material",
                shade: "Sample Shade",
                connection: "Sample Connection",
                warranty: "Sample Warranty"
            },
            leadTime: "Sample Lead Time",
            warranty: "Sample Warranty"
        };
        return (
            <main className="bg-white min-h-screen">
                <Navbar />

                <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/services/implants"
                        className="inline-flex items-center text-gray-600 hover:text-dentalForest transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Implants
                    </Link>

                    {/* Product Detail Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column - Image */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-3xl overflow-hidden relative aspect-square shadow-sm border border-gray-100">
                                <Image
                                    src={dummyProduct.image}
                                    alt={dummyProduct.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    priority
                                />
                            </div>

                            {/* Badge */}
                            <div className="flex flex-wrap gap-3">
                                <span className="bg-dentalForest/10 text-dentalForest text-sm font-medium px-4 py-2 rounded-full">
                                    {dummyProduct.category}
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                                    Sample Product
                                </span>
                            </div>
                        </div>

                        {/* Right Column - Information */}
                        <div className="space-y-8">
                            {/* Title and Description */}
                            <div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-black mb-6">
                                    {dummyProduct.name}
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {dummyProduct.description}
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-black mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {dummyProduct.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-dentalForest flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
                {/* Back Button */}
                <Link
                    href="/services/implants"
                    className="inline-flex items-center text-gray-600 hover:text-dentalForest transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Implants
                </Link>

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column - Image or 3D Model */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-3xl overflow-hidden relative aspect-square shadow-sm border border-gray-100">
                            {product.model ? (
                                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[10, 10, 5]} />
                                    <Model url={product.model} />
                                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                                </Canvas>
                            ) : (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    priority
                                />
                            )}
                        </div>

                        {/* Badge */}
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-dentalForest/10 text-dentalForest text-sm font-medium px-4 py-2 rounded-full">
                                {product.category}
                            </span>
                            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                                {product.retention === 'screw' ? '🔩 Screw Retained' : '🧪 Cement Retained'}
                            </span>
                        </div>
                    </div>

                    {/* Right Column - Information */}
                    <div className="space-y-8">
                        {/* Title and Description */}
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-black mb-6">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Material */}
                        {product.material && (
                            <div className="bg-gray-50 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setMaterialOpen(!materialOpen)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                                >
                                    <h2 className="text-xl font-bold text-black">Material</h2>
                                    {materialOpen ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {materialOpen && (
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.material}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Key Benefits */}
                        <div className="bg-gray-50 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setBenefitsOpen(!benefitsOpen)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                            >
                                <h2 className="text-xl font-bold text-black">Benefits</h2>
                                {benefitsOpen ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {benefitsOpen && (
                                <div className="px-6 pb-6">
                                    <ul className="space-y-3">
                                        {product.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-dentalForest flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Cut-Back Option */}
                        {(product as any).cutBackOption && (
                            <div className="bg-gray-50 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setCutBackOpen(!cutBackOpen)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                                >
                                    <h2 className="text-xl font-bold text-black">{(product as any).cutBackOption.title}</h2>
                                    {cutBackOpen ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {cutBackOpen && (
                                    <div className="px-6 pb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{(product as any).cutBackOption.subtitle}</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {(product as any).cutBackOption.description}
                                        </p>
                                        <h4 className="text-md font-semibold text-gray-800 mb-2">Why Choose the Cut-Back Option</h4>
                                        <ul className="space-y-2 mb-4">
                                            {(product as any).cutBackOption.whyChoose.map((reason: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <Check className="w-4 h-4 text-dentalForest flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{reason}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-gray-600 italic">
                                            {(product as any).cutBackOption.note}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}