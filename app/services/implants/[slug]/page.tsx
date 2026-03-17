"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Bounds } from "@react-three/drei";
import { use } from "react";
import { useState, Suspense, useEffect } from "react";
import * as THREE from 'three';

// ✅ Model Component with proper scaling and positioning
function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    
    // Clone the scene to allow for independent modifications
    const clonedScene = scene.clone();
    
    // Center and scale the model properly
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Calculate scale to fit in view (max dimension around 5 units)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4 / maxDim; // Scale to fit nicely in view
    
    // Position to center and lift slightly
    clonedScene.position.set(-center.x * scale, -center.y * scale + 1, -center.z * scale);
    clonedScene.scale.set(scale, scale, scale);
    
    return <primitive object={clonedScene} />;
}

// Preload models
useGLTF.preload("/3d-model/1.glb");
useGLTF.preload("/3d-model/test.glb");

// Product Data for all implant products with exact names
const productData: { [key: string]: any } = {
    // Screw Retained Products
    "anterior-crown-screw": {
        name: "Anterior Crown",
        category: "Screw retained",
        fullName: "Anterior Screw-Retained Implant Crown",
        description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained “screwmentable” design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
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
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the labial surface. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
            whyChooseTitle: "Why Choose the Cut-Back Option",
            benefits: [
                "Increased vitality and enamel-like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for single centrals and aesthetic-critical implant sites",
                "Maintains zirconia strength while elevating ceramic beauty",
            ],
            conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations."
        },
    },
    "posterior-crown-screw": {
        name: "Posterior Crown",
        category: "Screw retained",
        fullName: "Posterior Screw-Retained Implant Crown",
        description: `A digitally designed posterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained “screwmentable” design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
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
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For high-visibility posterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the visible surfaces. This option enhances optical depth and natural characterisation while maintaining the strength of the zirconia core.",
            whyChooseTitle: "Why Choose the Cut-Back Option",
            benefits: [
                "Increased vitality and enamel-like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for aesthetic-critical posterior sites",
                "Maintains zirconia strength while elevating ceramic beauty",
            ],
            conclusion: "This option replicates the subtle optical behaviour of natural teeth, making it the preferred choice for demanding aesthetic restorations."
        },
    },
    "anterior-3-unit-bridge-screw": {
        name: "Anterior 3 Unit Bridge",
        category: "Screw retained",
        fullName: "Anterior Screw-Retained 3 Unit Bridge",
        description: `A digitally designed anterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained “screwmentable” design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  
Custom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  
Both components are fully CE- and UKCA-marked with complete batch traceability.`,
        benefits: [
            "Screw-retained design for full clinical retrievability",
            "Gold-anodised titanium abutments for warm soft-tissue aesthetics",
            "Optimised emergence profile for stable peri-implant tissue support",
            "Fusion-Zirconia bridge for natural translucency and long-term strength",
            "Excellent marginal accuracy through CAD/CAM design",
            "Reduced risk of residual cement complications",
            "Biocompatible, stable and fully traceable",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia bridge bonded to the custom abutments, finished with micro-layered feldspathic-enriched ceramic on the labial surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
            whyChooseTitle: "Why Choose the Cut-Back Option",
            benefits: [
                "Increased vitality and enamel-like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for single centrals and aesthetic-critical implant sites",
                "Maintains zirconia strength while elevating ceramic beauty",
            ],
            conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations."
        },
    },
    "posterior-3-unit-bridge-screw": {
        name: "Posterior 3 Unit Bridge",
        category: "Screw retained",
        fullName: "Posterior Screw-Retained 3 Unit Bridge",
        description: `A digitally designed posterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained “screwmentable” design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  
Custom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  
Both components are fully CE- and UKCA-marked with complete batch traceability.`,
        benefits: [
            "Screw-retained design for full clinical retrievability",
            "Gold-anodised titanium abutments for warm soft-tissue aesthetics",
            "Optimised emergence profile for stable peri-implant tissue support",
            "Fusion-Zirconia bridge for natural translucency and long-term strength",
            "Excellent marginal accuracy through CAD/CAM design",
            "Reduced risk of residual cement complications",
            "Biocompatible, stable and fully traceable",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For high-visibility posterior implant cases, we offer a cut-back Fusion-Zirconia bridge bonded to the custom abutments, finished with micro-layered feldspathic-enriched ceramic on the visible surfaces. This option enhances optical depth and natural characterisation while maintaining the strength of the zirconia core.",
            whyChooseTitle: "Why Choose the Cut-Back Option",
            benefits: [
                "Increased vitality and enamel-like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for aesthetic-critical posterior sites",
                "Maintains zirconia strength while elevating ceramic beauty",
            ],
            conclusion: "This option replicates the subtle optical behaviour of natural teeth, making it the preferred choice for demanding aesthetic restorations."
        },
    },
    
    // Cement Retained Products
    "anterior-crown-cement": {
        name: "Anterior Crown",
        category: "Cement retained",
        fullName: "Anterior Cement-Retained Implant Crown",
        description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is designed for cement retention, providing excellent marginal fit and aesthetic outcomes.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  
Custom Titanium Abutment — CAD/CAM-milled Grade 5 titanium for optimal fit and biocompatibility.  
Both components are fully CE- and UKCA-marked with complete batch traceability.`,
        benefits: [
            "Cement-retained design for passive fit",
            "Excellent marginal accuracy through CAD/CAM design",
            "Fusion-Zirconia crown for natural translucency and long-term strength",
            "Custom abutment for optimal emergence profile",
            "Ideal for limited interarch space cases",
            "Predictable aesthetic outcomes",
            "Biocompatible, stable and fully traceable",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the labial surface.",
            whyChooseTitle: "Why Choose the Cut-Back Option",
            benefits: [
                "Increased vitality and enamel-like light refraction",
                "More natural surface texture and internal character",
                "Superior blending with adjacent natural teeth",
                "Ideal for single centrals and aesthetic-critical implant sites",
                "Maintains zirconia strength while elevating ceramic beauty",
            ],
            conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth."
        },
    },
    "posterior-crown-cement": {
        name: "Posterior Crown",
        category: "Cement retained",
        fullName: "Posterior Cement-Retained Implant Crown",
        description: `A digitally designed posterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is designed for cement retention, providing excellent marginal fit and durability.`,
        material: `Fusion-Zirconia — a multilayer zirconia with high flexural strength.  
Custom Titanium Abutment — CAD/CAM-milled Grade 5 titanium.  
Both components are fully CE- and UKCA-marked with complete batch traceability.`,
        benefits: [
            "Cement-retained design for passive fit",
            "Excellent marginal accuracy",
            "Fusion-Zirconia crown for long-term strength",
            "Custom abutment for optimal fit",
            "Biocompatible and fully traceable",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "For aesthetic-critical posterior cases, we offer enhanced ceramic layering on visible surfaces.",
            whyChooseTitle: "Why Choose the Enhanced Option",
            benefits: [
                "More natural surface texture",
                "Superior blending with adjacent teeth",
                "Maintains core strength",
            ],
            conclusion: "Ideal for demanding aesthetic requirements."
        },
    },
    "anterior-3-unit-bridge-cement": {
        name: "Anterior 3 Unit Bridge",
        category: "Cement retained",
        fullName: "Anterior Cement-Retained 3 Unit Bridge",
        description: `A digitally designed anterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. Designed for cement retention with optimal aesthetics.`,
        material: `Fusion-Zirconia bridge with custom titanium abutments. Both components are fully CE- and UKCA-marked.`,
        benefits: [
            "Cement-retained design",
            "Excellent marginal accuracy",
            "Fusion-Zirconia for natural aesthetics",
            "Custom abutments for optimal fit",
            "Biocompatible and traceable",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "Enhanced ceramic layering for anterior aesthetics.",
            whyChooseTitle: "Why Choose the Enhanced Option",
            benefits: [
                "Increased vitality",
                "Natural surface texture",
                "Superior blending",
            ],
            conclusion: "Ideal for demanding aesthetic cases."
        },
    },
    "posterior-3-unit-bridge-cement": {
        name: "Posterior 3 Unit Bridge",
        category: "Cement retained",
        fullName: "Posterior Cement-Retained 3 Unit Bridge",
        description: `A digitally designed posterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. Designed for cement retention with optimal strength.`,
        material: `Fusion-Zirconia bridge with custom titanium abutments. Fully CE- and UKCA-marked.`,
        benefits: [
            "Cement-retained design",
            "Excellent marginal accuracy",
            "High-strength Fusion-Zirconia",
            "Custom abutments",
            "Biocompatible",
        ],
        aesthetic: {
            title: "Enhanced Aesthetic Version",
            description: "Enhanced ceramic layering for visible surfaces.",
            whyChooseTitle: "Why Choose the Enhanced Option",
            benefits: [
                "Natural surface texture",
                "Superior blending",
            ],
            conclusion: "Ideal for aesthetic requirements."
        },
    },
};

// Function to get model path based on selections
function getModelPath(crown: string, abutment: string): string {
    // Combinations that show 1.glb
    const showOneGlb = [
        { crown: "Zirconia", abutment: "Titanium" },
        { crown: "Zirconia", abutment: "Zirconia" },
        { crown: "LISI", abutment: "Anodised" }
    ];
    
    // Check if current combination should show 1.glb
    const shouldShowOneGlb = showOneGlb.some(
        combo => combo.crown === crown && combo.abutment === abutment
    );
    
    return shouldShowOneGlb ? "/3d-model/test.glb" : "/3d-model/test.glb";
}

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const product = productData[slug];

    const [open, setOpen] = useState<string | null>(null); // No accordion open by default
    const toggle = (section: string) => {
        setOpen(open === section ? null : section);
    };

    // Default selections
    const [selectedCrown, setSelectedCrown] = useState("Zirconia");
    const [selectedAbutment, setSelectedAbutment] = useState("Titanium");
    
    // Get model path based on selections
    const [modelPath, setModelPath] = useState("/3d-model/1.glb");
    
    // Fix hydration issues by ensuring client-side only rendering for interactive elements
    const [isClient, setIsClient] = useState(false);
    const [modelError, setModelError] = useState(false);

    // Update model path when selections change
    useEffect(() => {
        setModelPath(getModelPath(selectedCrown, selectedAbutment));
        setModelError(false); // Reset error on model change
    }, [selectedCrown, selectedAbutment]);

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

                        {/* 3D MODEL - Fixed positioning and lighting */}
                        <div className="bg-gray-50 rounded-3xl h-[500px] border overflow-hidden relative">
                            {isClient && !modelError && (
                                <Canvas
                                    camera={{ 
                                        position: [3, 2, 5],
                                        fov: 45,
                                        near: 0.1,
                                        far: 1000
                                    }}
                                    onError={(e) => {
                                        console.error('Canvas error:', e);
                                        setModelError(true);
                                    }}
                                >
                                    {/* Enhanced lighting setup */}
                                    <ambientLight intensity={0.8} />
                                    
                                    {/* Key lights */}
                                    <directionalLight
                                        position={[5, 5, 5]}
                                        intensity={1.5}
                                        castShadow
                                        shadow-mapSize-width={1024}
                                        shadow-mapSize-height={1024}
                                    />
                                    <directionalLight
                                        position={[-5, 3, 5]}
                                        intensity={1.2}
                                    />
                                    
                                    {/* Fill lights */}
                                    <directionalLight
                                        position={[0, 5, -5]}
                                        intensity={0.8}
                                    />
                                    <directionalLight
                                        position={[0, 10, 0]}
                                        intensity={0.5}
                                    />
                                    
                                    {/* Back light for rim lighting */}
                                    <directionalLight
                                        position={[0, 2, -10]}
                                        intensity={0.6}
                                    />
                                    
                                    {/* Point lights for local highlights */}
                                    <pointLight position={[2, 3, 2]} intensity={0.5} />
                                    <pointLight position={[-2, 2, 2]} intensity={0.5} />
                                    
                                    {/* Environment reflection */}
                                    <hemisphereLight
                                        color="#ffffff"
                                        groundColor="#444444"
                                        intensity={0.6}
                                    />
                                    
                                    <Suspense fallback={
                                        <mesh>
                                            <boxGeometry args={[1, 1, 1]} />
                                            <meshStandardMaterial color="#666666" />
                                        </mesh>
                                    }>
                                        <Center>
                                            <Model url={modelPath} />
                                        </Center>
                                    </Suspense>

                                    <OrbitControls
                                        enableZoom
                                        enablePan
                                        enableRotate
                                        minDistance={2}
                                        maxDistance={10}
                                        autoRotate={true}
                                        autoRotateSpeed={1.5}
                                        rotateSpeed={0.8}
                                        zoomSpeed={1.2}
                                        panSpeed={0.8}
                                    />
                                </Canvas>
                            )}
                            {isClient && modelError && (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <div className="text-center">
                                        <p className="text-red-500 mb-2">Error loading 3D model</p>
                                        <button 
                                            onClick={() => setModelError(false)}
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!isClient && (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                                        <p className="text-gray-600">Loading 3D model...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CROWN BUTTONS */}
                        <div>
                            <h3 className="font-semibold mb-3 text-gray-700">Crown</h3>
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
                            <h3 className="font-semibold mb-3 text-gray-700">Abutment</h3>
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
                        {/* Category and Product Name */}
                        <div>
                            <span className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</span>
                            <h1 className="text-3xl font-bold text-gray-800 leading-tight mt-1">
                                {product.name}
                            </h1>
                        </div>

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
                                        {product.benefits.map((b: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0"></span>
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
                                    {/* Title */}
                                    <p className="font-semibold text-gray-800">{product.aesthetic.title}</p>
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.aesthetic.description}
                                    </p>

                                    {/* Why Choose Title */}
                                    <p className="font-semibold text-gray-800">{product.aesthetic.whyChooseTitle}</p>

                                    {/* Benefits with dots */}
                                    <ul className="space-y-3">
                                        {product.aesthetic.benefits.map((b: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0"></span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Conclusion */}
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.aesthetic.conclusion}
                                    </p>
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