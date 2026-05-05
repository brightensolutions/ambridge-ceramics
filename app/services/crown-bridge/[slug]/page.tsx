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
import { useState, Suspense, useEffect, useMemo, useRef, use, useCallback } from "react";
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

// Helper: Create a linear gradient texture (top to bottom)
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
// last.glb → crown_inner uses MeshPhysicalMaterial with gradient + base color
// cutback.glb → unchanged (original logic)
// ============================================================
type ModelProps = {
  url: string;
  crownType: string;
  abutmentType: string;
  hideCrown: boolean;
  hideAbutment: boolean;
  onLoaded?: () => void;
};

function Model({
  url,
  crownType,
  abutmentType,
  hideCrown,
  hideAbutment,
  onLoaded,
}: ModelProps) {
  const { scene } = useGLTF(url) as GLTF;
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  const abutmentMaterial = useMemo(() => {
    switch (abutmentType) {
      case "Titanium":
        return new THREE.MeshStandardMaterial({
          color: "#ffffff",
          metalness: 1,
          roughness: 0,
        });
      case "Anodised":
        return new THREE.MeshStandardMaterial({
          color: "#d7c37d",
          metalness: 0.9,
          roughness: 0,
        });
      case "Zirconia":
        return new THREE.MeshStandardMaterial({
          color: "#e8e2d8",
          metalness: 0,
          roughness: 0.18,
        });
      default:
        return null;
    }
  }, [abutmentType]);

  // Memoize gradient texture
  const gradientTexture = useMemo(() => createGradientTexture("#bdb0a1", "#9f8e7d"), []);

  useEffect(() => {
    if (!scene) return;

    const clone = SkeletonUtils.clone(scene);
    const isLast = url.includes("last");  // changed from "monolithic"

    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;

      const name = node.name.toLowerCase();

      if (name.includes("plane") || name.includes("base") || name.includes("ground")) {
        node.visible = false;
        return;
      }

      // ============================================================
      // LOGIC FOR last.glb
      // ============================================================
      if (isLast) {
        if (name.includes("crown_outer")) {
          node.material = Array.isArray(node.material)
            ? node.material.map((mat) => {
                const m = mat.clone();
                m.side = THREE.FrontSide;
                return m;
              })
            : (() => {
                const m = node.material.clone();
                m.side = THREE.FrontSide;
                return m;
              })();

          node.visible = !hideCrown;
          node.castShadow = true;
          node.receiveShadow = true;
        } 
        else if (name.includes("crown_inner")) {
          let innerMaterial: THREE.Material;

          if (hideAbutment) {
            // When abutment hidden: use gradient texture + cream base to keep contrast
            innerMaterial = new THREE.MeshPhysicalMaterial({
              map: gradientTexture,
              color: "#d6c7b6",           // cream base so gradient stays visible
              roughness: 0.48,
              metalness: 0,
              reflectivity: 0.28,
              clearcoat: 0.06,
              clearcoatRoughness: 0.55,
              envMapIntensity: 0.28,
              side: THREE.DoubleSide,
            });
          } else {
            // When abutment visible: plain colour fallback (subtle ceramic)
            innerMaterial = new THREE.MeshPhysicalMaterial({
              color: "#b7aa9a",
              roughness: 0.55,
              metalness: 0,
              reflectivity: 0.18,
              clearcoat: 0.04,
              clearcoatRoughness: 0.6,
              envMapIntensity: 0.18,
              side: THREE.DoubleSide,
            });
          }

          node.material = innerMaterial;
          node.visible = !hideCrown;
          node.castShadow = false;
          node.receiveShadow = true;
        }
        else if (name.includes("abutment")) {
          if (abutmentMaterial) {
            node.material = Array.isArray(node.material)
              ? node.material.map(() => abutmentMaterial.clone())
              : abutmentMaterial.clone();
          }

          node.visible = !hideAbutment;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      } 
      // ============================================================
      // OLD LOGIC FOR cutback.glb (completely unchanged)
      // ============================================================
      else {
        if (name.includes("crown")) {
          const originalMaterial = Array.isArray(node.material)
            ? node.material.map((mat) => {
                const m = mat.clone();
                m.side = THREE.FrontSide;
                return m;
              })
            : (() => {
                const m = node.material.clone();
                m.side = THREE.FrontSide;
                return m;
              })();

          node.material = originalMaterial;
          node.visible = !hideCrown;
          node.castShadow = true;
          node.receiveShadow = true;

          const oldShell = node.children.find((child) => child.userData?.isInnerShell);
          if (oldShell) node.remove(oldShell);

          if (hideAbutment) {
            const innerShell = new THREE.Mesh(
              node.geometry.clone(),
              new THREE.MeshStandardMaterial({
                color: "#efe4cf",
                roughness: 0.55,
                metalness: 0,
                side: THREE.BackSide,
                depthWrite: true,
                depthTest: true,
              })
            );

            innerShell.userData = { isInnerShell: true };
            innerShell.scale.set(0.94, 0.94, 0.94);
            innerShell.renderOrder = 10;
            innerShell.castShadow = false;
            innerShell.receiveShadow = false;

            node.add(innerShell);
          }
        } 
        else if (name.includes("abutment")) {
          if (abutmentMaterial) {
            node.material = Array.isArray(node.material)
              ? node.material.map(() => abutmentMaterial.clone())
              : abutmentMaterial.clone();
          }

          node.visible = !hideAbutment;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      }
    });

    // Center and scale the whole model
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scaleVal = 4 / Math.max(size.x, size.y, size.z);

    clone.position.set(
      -center.x * scaleVal,
      -center.y * scaleVal,
      -center.z * scaleVal
    );
    clone.scale.set(scaleVal, scaleVal, scaleVal);

    setModel(clone);
    if (onLoaded) onLoaded();
  }, [scene, abutmentMaterial, hideCrown, hideAbutment, onLoaded, url, gradientTexture]);

  return model ? <primitive object={model} /> : null;
}

useGLTF.preload("/3d-model/last.glb");
useGLTF.preload("/3d-model/cutback.glb");

// ============================================================
// FULL PRODUCT DATA (all variants – same as original)
// ============================================================
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
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
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
      description: "For high-visibility posterior implant cases, we offer a cut-back Fusion-Zirconia crown bonded to the custom abutment, finished with a micro-layered feldspathic-enriched ceramic on the visible surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
      whyChooseTitle: "Why Choose the Cut-Back Option",
      benefits: [
        "Increased vitality and enamel-like light refraction",
        "More natural surface texture and internal character",
        "Superior blending with adjacent natural teeth",
        "Ideal for aesthetic-critical posterior sites",
        "Maintains zirconia strength while elevating ceramic beauty",
      ],
      conclusion: "This option replicates the subtle optical behaviour of natural teeth, making it the preferred choice for demanding aesthetic restorations.",
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
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth, making it the preferred choice for demanding aesthetic implant restorations.",
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
      description: "For high-visibility anterior implant cases, we offer a cut-back Fusion-Zirconia bridge bonded to the custom abutments, finished with micro-layered feldspathic-enriched ceramic on the labial surfaces. This option enhances optical depth, translucency and natural characterisation while maintaining the strength of the zirconia core.",
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
      conclusion: "This option replicates the subtle optical behaviour of natural anterior teeth.",
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
      conclusion: "Ideal for demanding aesthetic requirements.",
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
      conclusion: "Ideal for demanding aesthetic cases.",
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
      conclusion: "Ideal for aesthetic requirements.",
    },
  },
};

// ============================================================
// LOADER COMPONENT
// ============================================================
function LoaderOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a2d8b2]"></div>
        <p className="text-gray-500 font-medium tracking-wide">Loading 3D model...</p>
      </div>
    </div>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = productData[slug];

  const [open, setOpen] = useState<string | null>(null);
  const toggle = (section: string) => setOpen(open === section ? null : section);

  const [modelMode, setModelMode] = useState<"cutback" | "last">("cutback");
  const [cutbackState, setCutbackState] = useState({
    crown: "Zirconia",
    abutment: "Titanium",
    hideCrown: false,
    hideAbutment: false,
  });
  const [lastState, setLastState] = useState({
    crown: "Zirconia",
    abutment: "Titanium",
    hideCrown: false,
    hideAbutment: false,
  });

  const currentState = modelMode === "cutback" ? cutbackState : lastState;
  const updateCurrentState = useCallback((updates: Partial<typeof currentState>) => {
    if (modelMode === "cutback") {
      setCutbackState(prev => ({ ...prev, ...updates }));
    } else {
      setLastState(prev => ({ ...prev, ...updates }));
    }
  }, [modelMode]);

  const [isClient, setIsClient] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setModelLoading(true);
    setModelError(false);
    if (modelMode === "cutback" && currentState.crown === "PFM") {
      updateCurrentState({ crown: "Zirconia" });
    }
  }, [modelMode, updateCurrentState]);

  const handleZoom = (direction: "in" | "out") => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object;
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
    if (direction === "in") dir.multiplyScalar(0.75);
    else dir.multiplyScalar(1.25);
    if (dir.length() < 2) dir.setLength(2);
    if (dir.length() > 10) dir.setLength(10);
    camera.position.copy(controls.target).add(dir);
    controls.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    controlsRef.current.object.position.set(5, 3, 5);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  const handleModelLoaded = useCallback(() => {
    setModelLoading(false);
  }, []);

  const isLastPFM = modelMode === "last" && currentState.crown === "PFM";
  const showPFM = modelMode !== "cutback";

  useEffect(() => {
    if (isLastPFM && currentState.hideAbutment) updateCurrentState({ hideAbutment: false });
  }, [isLastPFM, currentState.hideAbutment, updateCurrentState]);

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

        <div className="lg:hidden mb-8">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-3 py-1 mb-3">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-gray-50 to-[#a2d8b2]/20 h-[550px] border border-[#a2d8b2]/30 overflow-hidden relative shadow-sm group">
              {isClient && !modelError && modelLoading && <LoaderOverlay />}

              {isClient && !modelError && (
                <Canvas
                  gl={{
                    toneMappingExposure: 1.2,
                    toneMapping: THREE.ACESFilmicToneMapping,
                  }}
                  camera={{ position: [5, 3, 5], fov: 40 }}
                  onError={() => setModelError(true)}
                >
                  <color attach="background" args={["#616161"]} />

                  <Suspense fallback={null}>
                    <Environment
                      files="/3d-model/Industrial_Room.exr"
                      background={false}
                      environmentIntensity={1.3}
                    />
                    {/* Standard lighting (unchanged) */}
                    <directionalLight position={[-5, 8, 3]} intensity={2} color="#fff5e8" castShadow />
                    <directionalLight position={[4, 5, 3]} intensity={1} color="#ffeedd" />
                    <pointLight position={[5, 4.5, 2.2]} intensity={3.5} color="#ffe6b3" distance={5} decay={2} />
                    <directionalLight position={[1, 2, -4]} intensity={1} color="#ffffff" />
                    <ambientLight intensity={0.4} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                      <Center>
                        <Model
                          key={modelMode}
                          url={`/3d-model/${modelMode === "cutback" ? "cutback" : "last"}.glb`}
                          crownType={currentState.crown}
                          abutmentType={isLastPFM ? "Titanium" : currentState.abutment}
                          hideCrown={currentState.hideCrown}
                          hideAbutment={currentState.hideAbutment}
                          onLoaded={handleModelLoaded}
                        />
                      </Center>
                    </Float>

                    <CrownInteriorLight
                      hideAbutment={currentState.hideAbutment}
                      hideCrown={currentState.hideCrown}
                    />
                  </Suspense>

                  <OrbitControls
                    ref={controlsRef}
                    enableZoom
                    enablePan
                    enableRotate
                    minDistance={2}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={1.0}
                  />
                </Canvas>
              )}

              {isClient && !modelError && (
                <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => handleZoom("in")} className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-[#a2d8b2] transition-all text-gray-600 hover:-translate-y-1"><ZoomIn className="w-5 h-5" /></button>
                  <button onClick={() => handleZoom("out")} className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-[#a2d8b2] transition-all text-gray-600 hover:-translate-y-1"><ZoomOut className="w-5 h-5" /></button>
                  <button onClick={handleReset} className="bg-white/80 backdrop-blur-md p-3 shadow-lg border border-gray-100 hover:bg-gray-100 transition-all text-gray-600 mt-2 hover:-translate-y-1"><RotateCcw className="w-5 h-5" /></button>
                </div>
              )}

              {isClient && modelError && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-red-400 mb-3">Unable to load 3D model</p>
                    <button onClick={() => { setModelError(false); setModelLoading(true); }} className="px-6 py-2 bg-[#a2d8b2] text-gray-900 font-medium hover:bg-[#8ec29e]">Try Again</button>
                  </div>
                </div>
              )}
              {!isClient && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin h-10 w-10 border-b-2 border-[#a2d8b2] mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium tracking-wide">Initializing 3D viewer...</p>
                </div>
              )}
            </div>

            {/* SINGLE CONTROL BOX – unchanged */}
            <div className="bg-gray-50/50 p-6 border border-[#a2d8b2]/20 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">Restoration Type</h3>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setModelMode("cutback")} className={`px-6 py-3 border transition-all duration-300 font-medium ${modelMode === "cutback" ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"}`}>Cutback</button>
                  <button onClick={() => setModelMode("last")} className={`px-6 py-3 border transition-all duration-300 font-medium ${modelMode === "last" ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"}`}>Monolith</button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Crown Material</h3>
                  <button onClick={() => updateCurrentState({ hideCrown: !currentState.hideCrown })} className="text-gray-500 hover:text-gray-700 p-1">{currentState.hideCrown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => updateCurrentState({ crown: "Zirconia" })} className={`px-4 py-2.5 border transition-all duration-300 font-medium ${currentState.crown === "Zirconia" ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"}`}>Zirconia</button>
                  {showPFM && <button onClick={() => updateCurrentState({ crown: "PFM" })} className={`px-4 py-2.5 border transition-all duration-300 font-medium ${currentState.crown === "PFM" ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"}`}>PFM</button>}
                </div>
              </div>

              {!isLastPFM && (
                <div>
                  <div className="flex items-center gap-2 mb-3 ml-1">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Abutment Material</h3>
                    <button onClick={() => updateCurrentState({ hideAbutment: !currentState.hideAbutment })} className="text-gray-500 hover:text-gray-700 p-1">{currentState.hideAbutment ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Titanium", "Zirconia", "Anodised"].map(item => (
                      <button key={item} onClick={() => updateCurrentState({ abutment: item })} className={`px-4 py-2.5 border transition-all duration-300 font-medium ${currentState.abutment === item ? "bg-[#a2d8b2] text-gray-900 border-[#a2d8b2] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#a2d8b2] hover:bg-[#a2d8b2]/10"}`}>{item}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN – unchanged accordion sections */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <span className="text-sm font-bold uppercase tracking-widest text-[#7ab88a] bg-[#a2d8b2]/20 px-3 py-1">{product.category}</span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-5 leading-tight tracking-tight">{product.name}</h1>
            </div>
            <div className="prose prose-lg max-w-none pb-2">
              <p className="text-gray-600 leading-relaxed font-light text-[1.05rem]">{product.description}</p>
            </div>
            <div className="space-y-3">
              {/* Material Specifications */}
              <div className={`border overflow-hidden transition-all duration-300 ${open === "mat" ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20" : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"}`}>
                <button onClick={() => toggle("mat")} className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === "mat" ? "bg-[#a2d8b2]/10" : "bg-white hover:bg-[#a2d8b2]/5"}`}>
                  <span className={`text-lg font-bold transition-colors ${open === "mat" ? "text-gray-900" : "text-gray-800"}`}>Material Specifications</span>
                  <div className={`p-1.5 transition-all duration-300 ${open === "mat" ? "bg-[#a2d8b2] text-gray-900 rotate-180" : "bg-gray-50 text-gray-400"}`}><ChevronDown className="w-4 h-4" /></div>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${open === "mat" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden bg-white"><div className="p-4 pt-2 text-sm text-gray-600 border-t border-[#a2d8b2]/20"><p className="whitespace-pre-line leading-relaxed">{product.material}</p></div></div>
                </div>
              </div>

              {/* Clinical Benefits */}
              <div className={`border overflow-hidden transition-all duration-300 ${open === "ben" ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20" : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"}`}>
                <button onClick={() => toggle("ben")} className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === "ben" ? "bg-[#a2d8b2]/10" : "bg-white hover:bg-[#a2d8b2]/5"}`}>
                  <span className={`text-lg font-bold transition-colors ${open === "ben" ? "text-gray-900" : "text-gray-800"}`}>Clinical Benefits</span>
                  <div className={`p-1.5 transition-all duration-300 ${open === "ben" ? "bg-[#a2d8b2] text-gray-900 rotate-180" : "bg-gray-50 text-gray-400"}`}><ChevronDown className="w-4 h-4" /></div>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${open === "ben" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden bg-white"><div className="p-4 pt-3 border-t border-[#a2d8b2]/20"><ul className="space-y-3">{product.benefits.map((b: string, i: number) => (<li key={i} className="flex gap-3 items-start text-sm text-gray-600"><span className="w-1.5 h-1.5 bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span><span className="leading-relaxed">{b}</span></li>))}</ul></div></div>
                </div>
              </div>

              {/* Aesthetic Option */}
              {product.aesthetic && (
                <div className={`border overflow-hidden transition-all duration-300 ${open === "aes" ? "border-[#a2d8b2] shadow-md shadow-[#a2d8b2]/20" : "border-gray-100 shadow-sm hover:border-[#a2d8b2]/50"}`}>
                  <button onClick={() => toggle("aes")} className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${open === "aes" ? "bg-[#a2d8b2]/10" : "bg-white hover:bg-[#a2d8b2]/5"}`}>
                    <span className={`text-lg font-bold transition-colors ${open === "aes" ? "text-gray-900" : "text-gray-800"}`}>Cut-Back Aesthetic Option</span>
                    <div className={`p-1.5 transition-all duration-300 ${open === "aes" ? "bg-[#a2d8b2] text-gray-900 rotate-180" : "bg-gray-50 text-gray-400"}`}><ChevronDown className="w-4 h-4" /></div>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${open === "aes" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden bg-white"><div className="p-4 pt-3 border-t border-[#a2d8b2]/20 space-y-4 text-sm"><p className="font-bold text-gray-900">{product.aesthetic.title}</p><p className="text-gray-600 leading-relaxed bg-[#a2d8b2]/10 p-3 border border-[#a2d8b2]/20">{product.aesthetic.description}</p><p className="font-bold text-gray-900 pt-1">{product.aesthetic.whyChooseTitle}</p><ul className="space-y-2.5">{product.aesthetic.benefits.map((b: string, i: number) => (<li key={i} className="flex gap-3 items-start text-gray-600"><span className="w-1.5 h-1.5 bg-[#a2d8b2] mt-1.5 flex-shrink-0 shadow-sm"></span><span className="leading-relaxed">{b}</span></li>))}</ul><p className="text-gray-600 leading-relaxed italic border-l-4 border-[#a2d8b2] pl-3 mt-3 py-1">{product.aesthetic.conclusion}</p></div></div>
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