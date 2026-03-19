"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment, ContactShadows, Float } from "@react-three/drei";
import { use, useState, Suspense, useEffect, useMemo } from "react";
import * as THREE from 'three';

// ✅ Dynamic Model Component with realistic materials
function Model({ url, crownType, abutmentType }: { url: string, crownType: string, abutmentType: string }) {
    const { scene } = useGLTF(url);
    
    // 1. Dynamic Abutment Material
    const abutmentMaterial = useMemo(() => {
        if (abutmentType === "Anodised") {
            return new THREE.MeshStandardMaterial({
                color: new THREE.Color('#ffcc00'), // Warm Gold
                metalness: 1.0,
                roughness: 0.2,
                envMapIntensity: 1.5
            });
        }
        if (abutmentType === "Zirconia") {
            return new THREE.MeshStandardMaterial({
                color: new THREE.Color('#fdfbf7'), // White/Opaque
                metalness: 0.0,
                roughness: 0.2,
                envMapIntensity: 0.5
            });
        }
        // Default to Titanium (Silver)
        return new THREE.MeshStandardMaterial({
            color: new THREE.Color('#ffffff'), 
            metalness: 1.0,
            roughness: 0.15,
            envMapIntensity: 1.5
        });
    }, [abutmentType]);

    // 2. Dynamic Crown Material
    const crownMaterial = useMemo(() => {
        if (crownType === "LISI") {
            return new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#ffffff'),
                metalness: 0.0,
                roughness: 0.05,
                transmission: 0.8,
                thickness: 2.0,
                envMapIntensity: 1.2,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1
            });
        }
        if (crownType === "PFM") {
            return new THREE.MeshStandardMaterial({
                color: new THREE.Color('#f3eee6'),
                metalness: 0.0,
                roughness: 0.3,
                envMapIntensity: 0.8
            });
        }
        return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#fdfbf7'), 
            metalness: 0.0,
            roughness: 0.2,
            transmission: 0.2, 
            thickness: 1.5,
            envMapIntensity: 0.8
        });
    }, [crownType]);

    // 3. Apply Materials to the cloned scene
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        
        clone.traverse((node: any) => {
            if (node.isMesh) {
                const nodeName = node.name.toLowerCase();
                const materialName = node.material?.name?.toLowerCase() || '';
                
                const isAbutment = 
                    nodeName.includes('abutment') || nodeName.includes('implant') || 
                    nodeName.includes('screw') || nodeName.includes('connector') || 
                    nodeName.includes('post') || materialName.includes('metal') || 
                    materialName.includes('titanium') || materialName.includes('silver');
                
                const isCrown = 
                    nodeName.includes('crown') || nodeName.includes('tooth') || 
                    nodeName.includes('teeth') || nodeName.includes('zirconia') || 
                    materialName.includes('ceramic') || materialName.includes('crown');

                if (isAbutment || (node.position.y > 0 && nodeName.includes('connector'))) {
                    node.material = abutmentMaterial;
                } else if (isCrown) {
                    node.material = crownMaterial;
                }
                
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        const box = new THREE.Box3().setFromObject(clone);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim; 
        
        clone.position.set(-center.x * scale, -center.y * scale + 1, -center.z * scale);
        clone.scale.set(scale, scale, scale);
        
        return clone;
    }, [scene, abutmentMaterial, crownMaterial]);
    
    return <primitive object={clonedScene} />;
}

useGLTF.preload("/3d-model/test.glb");

const productData: { [key: string]: any } = {
    "anterior-crown-screw": {
        name: "Anterior Crown",
        category: "Screw retained",
        fullName: "Anterior Screw-Retained Implant Crown",
        description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
        description: `A digitally designed posterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
        description: `A digitally designed anterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
        description: `A digitally designed posterior 3-unit implant bridge combining our exclusive Fusion-Zirconia bridge with precision-milled CAD/CAM titanium custom abutments. The abutments are laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented bridge with the retrievability and clinical control of a screw-retained solution.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutments — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
    "anterior-crown-cement": {
        name: "Anterior Crown",
        category: "Cement retained",
        fullName: "Anterior Cement-Retained Implant Crown",
        description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is designed for cement retention, providing excellent marginal fit and aesthetic outcomes.`,
        material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium for optimal fit and biocompatibility.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
        material: `Fusion-Zirconia — a multilayer zirconia with high flexural strength.  \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium.  \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const product = productData[slug];

    const [open, setOpen] = useState<string | null>(null);
    const toggle = (section: string) => {
        setOpen(open === section ? null : section);
    };

    const [selectedCrown, setSelectedCrown] = useState("Zirconia");
    const [selectedAbutment, setSelectedAbutment] = useState("Titanium");
    
    const [isClient, setIsClient] = useState(false);
    const [modelError, setModelError] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!product) return <div className="p-20 text-center text-gray-500">Product not found</div>;

    return (
        <main className="bg-white min-h-screen font-sans">
            <Navbar />

            <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">

                <Link
                    href="/services/implants"
                    className="inline-flex items-center text-gray-500 mb-10 hover:text-[#7ab88a] transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Implants
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT COLUMN - 3D Model and Controls */}
                    <div className="space-y-6">

                        {/* 3D MODEL WITH BEAUTIFUL GRADIENT BACKGROUND */}
                        <div className="bg-gradient-to-b from-gray-50 to-[#a2d8b2]/20 rounded-[2rem] h-[550px] border border-[#a2d8b2]/30 overflow-hidden relative shadow-sm">
                            {isClient && !modelError && (
                                <Canvas
                                    camera={{ 
                                        position: [5, 3, 5],
                                        fov: 40,
                                        near: 0.1,
                                        far: 1000
                                    }}
                                    onError={(e) => {
                                        console.error('Canvas error:', e);
                                        setModelError(true);
                                    }}
                                >
                                    <Suspense fallback={null}>
                                        <Environment preset="city" />
                                        
                                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                                            <Center>
                                                <Model 
                                                    url="/3d-model/test.glb" 
                                                    crownType={selectedCrown} 
                                                    abutmentType={selectedAbutment} 
                                                />
                                            </Center>
                                        </Float>

                                        {/* Tinted shadow to match the brand color slightly */}
                                        <ContactShadows position={[0, -2, 0]} opacity={0.3} color="#6ba67e" scale={10} blur={2.5} far={4} />
                                    </Suspense>

                                    <OrbitControls
                                        enableZoom
                                        enablePan
                                        enableRotate
                                        minDistance={2}
                                        maxDistance={10}
                                        autoRotate={true}
                                        autoRotateSpeed={1.0}
                                    />
                                </Canvas>
                            )}
                            
                            {/* Loading / Error States */}
                            {isClient && modelError && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-red-400 mb-3 font-medium">Unable to load 3D model</p>
                                        <button 
                                            onClick={() => setModelError(false)}
                                            className="px-6 py-2 bg-[#a2d8b2] text-gray-900 font-medium rounded-full hover:bg-[#8ec29e] transition-colors shadow-sm"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!isClient && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a2d8b2] mx-auto mb-4"></div>
                                        <p className="text-gray-500 font-medium tracking-wide">Initializing 3D Viewer...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* STACKED INTERACTIVE CONTROLS */}
                        <div className="flex flex-col gap-6 bg-gray-50/50 p-6 rounded-[2rem] border border-[#a2d8b2]/20">
                            {/* Crown Section */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">Crown Material</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {["Zirconia", "LISI", "PFM"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSelectedCrown(item)}
                                            className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                                                selectedCrown === item
                                                    ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/30"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Abutment Section */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">Abutment Material</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {["Titanium", "Zirconia", "Anodised"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSelectedAbutment(item)}
                                            className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                                                selectedAbutment === item
                                                    ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/30"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN - Product Information (Aligned to Top) */}
                    <div className="space-y-6">
                        
                        {/* Headers */}
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-5 leading-tight tracking-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg max-w-none pb-2">
                            <p className="text-gray-600 leading-relaxed font-light text-[1.05rem]">
                                {product.description}
                            </p>
                        </div>

                        {/* COMPACT BRANDED ACCORDIONS */}
                        <div className="space-y-3">
                            
                            {/* MATERIAL */}
                            <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${open === 'mat' ? 'border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20' : 'border-gray-100 shadow-sm hover:border-[#a2d8b2]/50'}`}>
                                <button 
                                    onClick={() => toggle("mat")} 
                                    className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === 'mat' ? 'bg-[#a2d8b2]/10' : 'bg-white hover:bg-[#a2d8b2]/5'}`}
                                >
                                    <span className={`text-lg font-bold transition-colors ${open === 'mat' ? 'text-gray-900' : 'text-gray-800'}`}>Material Specifications</span>
                                    <div className={`p-1.5 rounded-full transition-all duration-300 ${open === 'mat' ? 'bg-[#a2d8b2] text-gray-900 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${open === 'mat' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden bg-white">
                                        <div className="p-4 pt-2 text-sm text-gray-600 border-t border-[#a2d8b2]/20">
                                            <p className="whitespace-pre-line leading-relaxed">
                                                {product.material}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BENEFITS */}
                            <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${open === 'ben' ? 'border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20' : 'border-gray-100 shadow-sm hover:border-[#a2d8b2]/50'}`}>
                                <button 
                                    onClick={() => toggle("ben")} 
                                    className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === 'ben' ? 'bg-[#a2d8b2]/10' : 'bg-white hover:bg-[#a2d8b2]/5'}`}
                                >
                                    <span className={`text-lg font-bold transition-colors ${open === 'ben' ? 'text-gray-900' : 'text-gray-800'}`}>Clinical Benefits</span>
                                    <div className={`p-1.5 rounded-full transition-all duration-300 ${open === 'ben' ? 'bg-[#a2d8b2] text-gray-900 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${open === 'ben' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden bg-white">
                                        <div className="p-4 pt-3 border-t border-[#a2d8b2]/20">
                                            <ul className="space-y-3">
                                                {product.benefits.map((b: string, i: number) => (
                                                    <li key={i} className="flex gap-3 items-start text-sm text-gray-600">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span>
                                                        <span className="leading-relaxed">{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AESTHETIC OPTION */}
                            {product.aesthetic && (
                                <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${open === 'aes' ? 'border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20' : 'border-gray-100 shadow-sm hover:border-[#a2d8b2]/50'}`}>
                                    <button 
                                        onClick={() => toggle("aes")} 
                                        className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === 'aes' ? 'bg-[#a2d8b2]/10' : 'bg-white hover:bg-[#a2d8b2]/5'}`}
                                    >
                                        <span className={`text-lg font-bold transition-colors ${open === 'aes' ? 'text-gray-900' : 'text-gray-800'}`}>Cut-Back Aesthetic Option</span>
                                        <div className={`p-1.5 rounded-full transition-all duration-300 ${open === 'aes' ? 'bg-[#a2d8b2] text-gray-900 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-in-out ${open === 'aes' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden bg-white">
                                            <div className="p-4 pt-3 border-t border-[#a2d8b2]/20 space-y-4 text-sm">
                                                <p className="font-bold text-gray-900">{product.aesthetic.title}</p>
                                                
                                                <p className="text-gray-600 leading-relaxed bg-[#a2d8b2]/10 p-3 rounded-lg border border-[#a2d8b2]/20">
                                                    {product.aesthetic.description}
                                                </p>

                                                <p className="font-bold text-gray-900 pt-1">{product.aesthetic.whyChooseTitle}</p>

                                                <ul className="space-y-2.5">
                                                    {product.aesthetic.benefits.map((b: string, i: number) => (
                                                        <li key={i} className="flex gap-3 items-start text-gray-600">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span>
                                                            <span className="leading-relaxed">{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <p className="text-gray-600 leading-relaxed italic border-l-4 border-[#a2d8b2] pl-3 mt-3 py-1">
                                                    {product.aesthetic.conclusion}
                                                </p>
                                            </div>
                                        </div>
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