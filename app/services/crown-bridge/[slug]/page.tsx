"use client";

import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ArrowLeft, ChevronDown, ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Environment,
  Float,
} from "@react-three/drei";
import { useState, Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils, GLTF } from "three-stdlib";

// ============================================================
// INTERIOR LIGHT – disabled (no extra light when abutment hidden)
// ============================================================
type InteriorLightProps = {
  hideAbutment: boolean;
  hideCrown: boolean;
};

function CrownInteriorLight({ hideAbutment, hideCrown }: InteriorLightProps) {
  // No interior light – crown should show exactly as is
  return null;
}

// ============================================================
// HELPER: Gradient Texture
// ============================================================
function createGradientTexture(topColor: string, bottomColor: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, topColor);
  gradient.addColorStop(1, bottomColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

// ============================================================
// MODEL COMPONENT
// ============================================================
type ModelProps = {
  url: string;
  crownType: string;
  abutmentType: string;
  hideCrown: boolean;
  hideAbutment: boolean;
  onLoaded?: () => void;
};

function Model({ url, crownType, abutmentType, hideCrown, hideAbutment, onLoaded }: ModelProps) {
  const { scene } = useGLTF(url) as GLTF;
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  const abutmentMaterial = useMemo(() => {
    switch (abutmentType) {
      case "Titanium": return new THREE.MeshStandardMaterial({ color: "#ffffff", metalness: 1, roughness: 0 });
      case "Anodised": return new THREE.MeshStandardMaterial({ color: "#d7c37d", metalness: 0.9, roughness: 0 });
      case "Zirconia": return new THREE.MeshStandardMaterial({ color: "#e8e2d8", metalness: 0, roughness: 0.18 });
      default: return null;
    }
  }, [abutmentType]);

  const gradientTexture = useMemo(() => createGradientTexture("#bdb0a1", "#9f8e7d"), []);

  useEffect(() => {
    if (!scene) return;
    const clone = SkeletonUtils.clone(scene);
    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const name = node.name.toLowerCase();
      if (name.includes("plane") || name.includes("base") || name.includes("ground")) {
        node.visible = false;
        return;
      }
      
      // Last.glb handling (Full Contour)
      if (url.includes("last")) {
        if (name.includes("crown_inner")) {
          node.material = new THREE.MeshPhysicalMaterial({
            map: hideAbutment ? gradientTexture : null,
            color: hideAbutment ? "#d6c7b6" : "#b7aa9a",
            side: THREE.DoubleSide,
            roughness: 0.5
          });
          node.visible = !hideCrown;
        }
        else if (name.includes("crown_outer")) {
          node.material = Array.isArray(node.material)
            ? node.material.map((mat) => { const m = mat.clone(); m.side = THREE.FrontSide; return m; })
            : (() => { const m = node.material.clone(); m.side = THREE.FrontSide; return m; })();
          node.visible = !hideCrown;
        }
        else if (name.includes("abutment")) {
          if (abutmentMaterial) node.material = abutmentMaterial;
          node.visible = !hideAbutment;
        }
      } 
      // Cutback.glb handling
      else {
        if (name.includes("crown")) {
          node.material = Array.isArray(node.material)
            ? node.material.map((mat) => { const m = mat.clone(); m.side = THREE.FrontSide; return m; })
            : (() => { const m = node.material.clone(); m.side = THREE.FrontSide; return m; })();
          node.visible = !hideCrown;

          const oldShell = node.children.find((child) => child.userData?.isInnerShell);
          if (oldShell) node.remove(oldShell);

          if (hideAbutment) {
            const innerShell = new THREE.Mesh(
              node.geometry.clone(),
              new THREE.MeshStandardMaterial({
                color: "#efe4cf", roughness: 0.55, metalness: 0, side: THREE.BackSide,
              })
            );
            innerShell.userData = { isInnerShell: true };
            innerShell.scale.set(0.94, 0.94, 0.94);
            node.add(innerShell);
          }
        } 
        else if (name.includes("abutment")) {
          if (abutmentMaterial) node.material = abutmentMaterial;
          node.visible = !hideAbutment;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Scale slightly reduced to 2.0 to add a bit of padding around the edges
    const scaleVal = 2.0 / Math.max(size.x, size.y, size.z); 
    
    clone.position.set(-center.x * scaleVal, -center.y * scaleVal, -center.z * scaleVal);
    clone.scale.set(scaleVal, scaleVal, scaleVal);
    setModel(clone);
    
    if (onLoaded) onLoaded();
  }, [scene, abutmentMaterial, hideCrown, hideAbutment, onLoaded, url, gradientTexture]);

  return model ? <primitive object={model} /> : null;
}

useGLTF.preload("/3d-model/last.glb");
useGLTF.preload("/3d-model/cutback.glb");

// ============================================================
// PRODUCT DATA
// ============================================================
const productData: { [key: string]: any } = {
  "anterior-crown-screw": {
    name: "Anterior Crown",
    category: "Screw retained",
    description: `A digitally designed anterior implant restoration combining our exclusive Fusion-Zirconia crown with a precision-milled CAD/CAM titanium custom abutment. The abutment is laboratory-bonded and anodised gold to enhance soft-tissue warmth and optimise the emergence profile. This screw-retained "screwmentable" design provides the aesthetic benefits of a cemented crown with the retrievability and clinical control of a screw-retained solution.`,
    material: `Fusion-Zirconia — a multilayer zirconia with a continuous dentine-to-enamel gradient, natural translucency and high flexural strength. \nCustom Titanium Abutment — CAD/CAM-milled Grade 5 titanium, anodised gold for improved soft-tissue integration and enhanced aesthetic blending. \nBoth components are fully CE- and UKCA-marked with complete batch traceability.`,
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
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
    },
  },
};

// ============================================================
// LOADER COMPONENT
// ============================================================
function LoaderOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f8f9f8]/80 backdrop-blur-sm z-30">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7ab88a]"></div>
        <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">Loading Model</p>
      </div>
    </div>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productData[slug] || productData["anterior-crown-screw"];

  // This component uses client-side interactivity but params are resolved server-side
  return <ProductDetailClient product={product} slug={slug} />;
}

function ProductDetailClient({ product, slug }: { product: any; slug: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [modelMode, setModelMode] = useState<"cutback" | "full-contour">("cutback");
  const [state, setState] = useState({ 
    crown: "Zirconia", 
    abutment: "Titanium", 
    hideCrown: false, 
    hideAbutment: false 
  });
  const [modelLoading, setModelLoading] = useState(true);
  const controlsRef = useRef<any>(null);

  // PFM constraint: When in Full Contour mode with PFM crown, abutment must be Titanium and not hidden
  const isFullContourPFM = modelMode === "full-contour" && state.crown === "PFM";
  
  useEffect(() => {
    if (isFullContourPFM) {
      if (state.abutment !== "Titanium" || state.hideAbutment !== false) {
        setState(prev => ({ ...prev, abutment: "Titanium", hideAbutment: false }));
      }
    }
  }, [isFullContourPFM, state.abutment, state.hideAbutment]);

  const updateState = (updates: Partial<typeof state>) => {
    let newState = { ...state, ...updates };
    // If PFM constraint applies, enforce abutment Titanium and not hidden
    if (modelMode === "full-contour" && newState.crown === "PFM") {
      newState.abutment = "Titanium";
      newState.hideAbutment = false;
    }
    setState(newState);
  };

  const handleZoom = (direction: "in" | "out") => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    const dir = new THREE.Vector3().subVectors(camera.position, controlsRef.current.target);
    if (direction === "in") dir.multiplyScalar(0.75); else dir.multiplyScalar(1.25);
    // Clamp zoom limits
    if (dir.length() < 2) dir.setLength(2);
    if (dir.length() > 12) dir.setLength(12);
    camera.position.copy(controlsRef.current.target).add(dir);
    controlsRef.current.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    // Reset to the padded top-centered position
    controlsRef.current.object.position.set(0, -0.6, 8.5);
    controlsRef.current.target.set(0, -0.6, 0); 
    controlsRef.current.update();
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      <section className="pt-24 lg:pt-40 pb-20 px-4 lg:px-12 max-w-[1400px] mx-auto">
        <Link href="/services/implants" className="inline-flex items-center text-gray-500 mb-6 lg:mb-10 hover:text-[#7ab88a] transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Implants
        </Link>

        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-2 py-0.5 mb-2 rounded-sm">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: 3D Viewer with Overlay Controls */}
          <div className="relative group rounded-2xl overflow-hidden border border-gray-200 shadow-xl w-full h-[650px] lg:h-[750px] bg-[#f8f9f8] lg:sticky lg:top-24">
            
            {modelLoading && <LoaderOverlay />}
            
            <div className="absolute inset-x-0 top-[-10%] h-[110%] z-10">
              <Canvas 
                gl={{
                  toneMappingExposure: 1.2,
                  toneMapping: THREE.ACESFilmicToneMapping,
                }}
                camera={{ position: [0, -0.6, 8.5], fov: 40 }} 
                style={{ touchAction: 'pan-y' }}
              >
                <color attach="background" args={["#616161"]} />
                <Suspense fallback={null}>
                  <Environment files="/3d-model/Industrial_Room.exr" background={false} environmentIntensity={1.3} />
                  
                  {/* Lighting from old version */}
                  <directionalLight position={[-5, 8, 3]} intensity={2} color="#fff5e8" castShadow />
                  <directionalLight position={[4, 5, 3]} intensity={1} color="#ffeedd" />
                  <pointLight position={[5, 4.5, 2.2]} intensity={3.5} color="#ffe6b3" distance={5} decay={2} />
                  <directionalLight position={[1, 2, -4]} intensity={1} color="#ffffff" />
                  <ambientLight intensity={0.4} />
                  
                  {/* Model stays perfectly centered */}
                  <group position={[0, 0, 0]}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                      <Center>
                        <Model
                          key={modelMode}
                          url={`/3d-model/${modelMode === "cutback" ? "cutback" : "last"}.glb`}
                          crownType={state.crown}
                          abutmentType={isFullContourPFM ? "Titanium" : state.abutment}
                          hideCrown={state.hideCrown}
                          hideAbutment={isFullContourPFM ? false : state.hideAbutment}
                          onLoaded={() => setModelLoading(false)}
                        />
                      </Center>
                    </Float>
                  </group>
                  
                  <CrownInteriorLight 
                    hideAbutment={isFullContourPFM ? false : state.hideAbutment} 
                    hideCrown={state.hideCrown} 
                  />
                  
                  <OrbitControls 
                    ref={controlsRef} 
                    target={[0, -0.6, 0]} 
                    enableZoom={true} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={0.5} 
                    minDistance={2}
                    maxDistance={12}
                    makeDefault 
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Viewport Control Buttons (Top Right) */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
              <button onClick={() => handleZoom("in")} className="bg-white/80 backdrop-blur-md p-2.5 shadow-sm border border-white/20 rounded-full hover:bg-white transition-all text-gray-600"><ZoomIn className="w-4 h-4" /></button>
              <button onClick={() => handleZoom("out")} className="bg-white/80 backdrop-blur-md p-2.5 shadow-sm border border-white/20 rounded-full hover:bg-white transition-all text-gray-600"><ZoomOut className="w-4 h-4" /></button>
              <button onClick={handleReset} className="bg-white/80 backdrop-blur-md p-2.5 shadow-sm border border-white/20 rounded-full hover:bg-white transition-all text-gray-600 mt-2"><RotateCcw className="w-4 h-4" /></button>
            </div>

            {/* Invisible safe scroll zone for mobile users below the control buttons */}
            <div className="absolute top-44 right-0 w-24 bottom-[240px] z-20 lg:hidden pointer-events-auto" style={{ touchAction: "pan-y" }} />

            {/* Tall Gradient Overlay Background */}
            <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-20" />

            {/* Configurator Controls Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-5 lg:p-8 z-30 flex flex-col gap-5">
              
              <h2 className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] -mb-2">Configure your restoration</h2>

              {/* Restoration Type */}
              <div className="space-y-2.5">
                <p className="text-white/80 text-[11px] font-medium tracking-wide">Restoration Type</p>
                <div className="flex gap-2">
                  {["Cutback", "Full Contour"].map((m: string) => {
                    const modeValue = m === "Full Contour" ? "full-contour" : "cutback";
                    return (
                      <button
                        key={m}
                        onClick={() => setModelMode(modeValue as "cutback" | "full-contour")}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
                          modelMode === modeValue 
                            ? "bg-[#7ab88a] border-[#7ab88a] text-white" 
                            : "bg-white/20 backdrop-blur-md border-white/30 text-white/90 hover:bg-white/30"
                        }`}
                      >
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Crown Material - Eye icon placed beside the title, glass effect on badges */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <p className="text-white/80 text-[11px] font-medium tracking-wide">Crown Material</p>
                  <button onClick={() => updateState({ hideCrown: !state.hideCrown })} className="text-white/50 hover:text-white transition-colors">
                    {state.hideCrown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  {["Zirconia", "PFM"].map((c: string) => (
                    <button
                      key={c}
                      onClick={() => updateState({ crown: c })}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
                        state.crown === c 
                          ? "bg-[#7ab88a] border-[#7ab88a] text-white" 
                          : "bg-white/20 backdrop-blur-md border-white/30 text-white/90 hover:bg-white/30"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Abutment Material - Glass effect on badges */}
              {!(modelMode === "full-contour" && state.crown === "PFM") && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <p className="text-white/80 text-[11px] font-medium tracking-wide">Abutment Material</p>
                    <button onClick={() => updateState({ hideAbutment: !state.hideAbutment })} className="text-white/50 hover:text-white transition-colors">
                      {state.hideAbutment ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {["Titanium", "Zirconia", "Anodised"].map((a: string) => (
                      <button
                        key={a}
                        onClick={() => updateState({ abutment: a })}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
                          state.abutment === a 
                            ? "bg-[#7ab88a] border-[#7ab88a] text-white" 
                            : "bg-white/20 backdrop-blur-md border-white/30 text-white/90 hover:bg-white/30"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Content & Accordions (unchanged) */}
          <div className="space-y-8">
            <div className="hidden lg:block">
              <span className="text-xs font-bold text-[#7ab88a] uppercase tracking-widest bg-[#a2d8b2]/20 px-3 py-1 rounded-sm">{product.category}</span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-5 leading-tight tracking-tight">{product.name}</h1>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed font-light text-[1.05rem]">{product.description}</p>
            </div>

            <div className="space-y-4">
              {[
                { id: "mat", label: "Material Specifications", content: product.material, isPre: true },
                { id: "ben", label: "Clinical Benefits", list: product.benefits },
                { id: "aes", label: "Cut-Back Aesthetic Option", aesthetic: product.aesthetic }
              ].map((section) => (
                section.aesthetic || section.content || section.list ? (
                  <div key={section.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${open === section.id ? "border-[#a2d8b2] bg-white shadow-lg shadow-[#a2d8b2]/10" : "border-gray-100 bg-gray-50/30 hover:border-[#a2d8b2]/50"}`}>
                    <button onClick={() => setOpen(open === section.id ? null : section.id)} className="w-full flex justify-between items-center px-5 py-4 text-left">
                      <span className={`text-lg font-bold ${open === section.id ? "text-gray-900" : "text-gray-700"}`}>{section.label}</span>
                      <div className={`p-1.5 rounded-full transition-transform duration-300 ${open === section.id ? "bg-[#a2d8b2] text-white rotate-180" : "bg-gray-100 text-gray-500"}`}><ChevronDown className="w-4 h-4" /></div>
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${open === section.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-2 text-sm text-gray-600 border-t border-gray-100">
                          {section.isPre && <p className="whitespace-pre-line leading-relaxed">{section.content}</p>}
                          {section.list && (
                            <ul className="space-y-3 mt-2">
                              {section.list.map((li: string, i: number) => (
                                <li key={i} className="flex gap-3 items-start"><span className="w-1.5 h-1.5 bg-[#7ab88a] mt-1.5 rounded-full flex-shrink-0"></span><span className="leading-relaxed">{li}</span></li>
                              ))}
                            </ul>
                          )}
                          {section.aesthetic && (
                            <div className="space-y-4 mt-2">
                              <p className="font-bold text-gray-900">{section.aesthetic.title}</p>
                              <div className="bg-[#a2d8b2]/10 p-4 rounded-lg border border-[#a2d8b2]/20 leading-relaxed">{section.aesthetic.description}</div>
                              <p className="font-bold text-gray-900 pt-2">{section.aesthetic.whyChooseTitle}</p>
                              <ul className="space-y-3">
                                {section.aesthetic.benefits.map((b: string, i: number) => (
                                  <li key={i} className="flex gap-3 items-start"><span className="w-1.5 h-1.5 bg-[#7ab88a] mt-1.5 rounded-full flex-shrink-0"></span><span className="leading-relaxed">{b}</span></li>
                                ))}
                              </ul>
                              <p className="text-gray-600 italic border-l-2 border-[#7ab88a] pl-3 py-1 mt-4 leading-relaxed">{section.aesthetic.conclusion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}