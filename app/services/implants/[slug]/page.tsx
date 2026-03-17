"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";
import { use } from "react";
import { useState, Suspense, useEffect } from "react";

// ✅ Model Component with zoomed out scale
function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);

    return (
        <primitive
            object={scene}
            scale={0.4}              // 👈 Smaller scale for more zoomed out view
            position={[0, -0.8, 0]}  // 👈 Adjusted position to center better
        />
    );
}

// Preload single model
useGLTF.preload("/3d-model/1.glb");

// Product Data
const productData = {
    "anterior-crown-screw": {
        name: "Anterior Screw-Retained Implant Crown & Bridge — Fusion-Zirconia (Screwmentable)",

        description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown or bridge with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained “screwmentable” design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,

        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  
Custom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  
Both components are fully CE- and UKCA-marked with complete batch traceability.`,

        benefits: [
            "Screw-retained design for full clinical retrievability",
            "Gold-anodised titanium abutment for warm soft-tissue aesthetics",
            "Optimised emergence profile for stable peri-implant tissue support",
            "Fusion-Zirconia crown for natural translucency and long-term strength",
            "Excellent marginal accuracy through CAD/CAM design",
            "Reduced risk of residual cement complications",
            "Biocompatible, stable and fully traceable",
        ],

        aesthetic: `Enhanced Aesthetic Version

For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the labial surface. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.

Why Choose the Cut-Back Option

This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.`,

        aestheticBenefits: [
            "Increased vitality and enamel-like light refraction",
            "More natural surface texture and internal character",
            "Superior blending with adjacent natural teeth",
            "Ideal for single centrals and aesthetic-critical implant sites",
            "Maintains zirconia strength while elevating ceramic beauty",
        ],
    },
};

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const product = productData[slug as keyof typeof productData];

    const [open, setOpen] = useState<string | null>(null); // No accordion open by default
    const toggle = (section: string) => {
        setOpen(open === section ? null : section);
    };

    // Default selections
    const [selectedCrown, setSelectedCrown] = useState("Zirconia");
    const [selectedAbutment, setSelectedAbutment] = useState("Titanium");
    
    // Use single model for now
    const modelPath = "/3d-model/1.glb";
    
    // Fix hydration issues by ensuring client-side only rendering for interactive elements
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true after hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!product) return <div>Product not found</div>;

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">

                <Link
                    href="/services/implants"
                    className="inline-flex items-center text-gray-600 mb-12 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Implants
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT COLUMN - 3D Model and Controls */}
                    <div className="space-y-6">

                        {/* 3D MODEL - More zoomed out */}
                        <div className="bg-gray-50 rounded-3xl h-[500px] border overflow-hidden">
                            {isClient && (
                                <Canvas 
                                    camera={{ 
                                        position: [0, 2, 20], // 👈 Further camera distance
                                        fov: 40                 // 👈 Slightly narrower FOV for better framing
                                    }}
                                >
                                    <ambientLight intensity={1.2} />
                                    <directionalLight position={[5, 5, 5]} intensity={1} />
                                    <directionalLight position={[-5, 2, 5]} intensity={0.5} />
                                    
                                    <Suspense fallback={null}>
                                        <Center>
                                            <Model url={modelPath} />
                                        </Center>
                                    </Suspense>

                                    <OrbitControls
                                        enableZoom
                                        enablePan
                                        minDistance={12}  // 👈 Increased minimum distance
                                        maxDistance={30}  // 👈 Increased maximum distance
                                        autoRotate={true}
                                        autoRotateSpeed={1.5}
                                    />
                                </Canvas>
                            )}
                            {!isClient && (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <div className="text-gray-400">Loading 3D model...</div>
                                </div>
                            )}
                        </div>

                        {/* CROWN BUTTONS */}
                        <div>
                            <h3 className="font-semibold mb-3 text-gray-700">Crown Material</h3>
                            <div className="flex gap-2 flex-wrap">
                                {["Zirconia", "LISI", "PFM"].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSelectedCrown(item)}
                                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 ${
                                            selectedCrown === item
                                                ? "bg-black text-white border-black shadow-md"
                                                : "bg-white hover:border-gray-400"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ABUTMENT BUTTONS */}
                        <div>
                            <h3 className="font-semibold mb-3 text-gray-700">Abutment Material</h3>
                            <div className="flex gap-2 flex-wrap">
                                {["Titanium", "Zirconia", "Anodised"].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSelectedAbutment(item)}
                                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 ${
                                            selectedAbutment === item
                                                ? "bg-black text-white border-black shadow-md"
                                                : "bg-white hover:border-gray-400"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current selection indicator */}
                        {isClient && (
                            <div className="text-sm text-gray-500 mt-2">
                                Currently viewing: {selectedCrown} crown with {selectedAbutment} abutment
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN - Product Information */}
                    <div className="space-y-6">
                        {/* Product Name - Sentence case */}
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                            {product.name}
                        </h1>

                        {/* Description - Always visible, not in accordion */}
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* MATERIAL ACCORDION */}
                        <div className="border rounded-xl overflow-hidden">
                            <button 
                                onClick={() => toggle("mat")} 
                                className="w-full flex justify-between items-center p-4 font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-lg">Material</span>
                                {open === "mat" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                            {open === "mat" && (
                                <div className="p-4 text-gray-600 border-t">
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {product.material}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* BENEFITS ACCORDION */}
                        <div className="border rounded-xl overflow-hidden">
                            <button 
                                onClick={() => toggle("ben")} 
                                className="w-full flex justify-between items-center p-4 font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-lg">Benefits</span>
                                {open === "ben" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                            {open === "ben" && (
                                <div className="p-4 border-t">
                                    <ul className="space-y-3">
                                        {product.benefits.map((b, i) => (
                                            <li key={i} className="flex gap-3 text-gray-600">
                                                <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* CUT-BACK / MICRO-LAYERED AESTHETIC OPTION ACCORDION */}
                        <div className="border rounded-xl overflow-hidden">
                            <button 
                                onClick={() => toggle("aes")} 
                                className="w-full flex justify-between items-center p-4 font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-lg">Cut-Back / Micro-Layered Aesthetic Option</span>
                                {open === "aes" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                            {open === "aes" && (
                                <div className="p-4 border-t space-y-4">
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {product.aesthetic}
                                    </p>

                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Why Choose the Cut-Back Option</h4>
                                        <ul className="space-y-3">
                                            {product.aestheticBenefits.map((b, i) => (
                                                <li key={i} className="flex gap-3 text-gray-600">
                                                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}